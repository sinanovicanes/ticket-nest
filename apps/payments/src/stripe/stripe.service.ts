import { StripeCheckoutDto } from '@app/contracts/payments';
import {
  DiscountsMicroService,
  TicketSalesMicroService,
  TicketsMicroService,
} from '@app/microservices';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Stripe } from 'stripe';
import { PaymentsService } from '../payments.service';
import { DiscountKind } from '@app/database';

@Injectable()
export class StripeService {
  private readonly client: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly paymentService: PaymentsService,
    private readonly discountsMicroService: DiscountsMicroService,
    private readonly ticketSalesMicroService: TicketSalesMicroService,
    private readonly ticketsMicroService: TicketsMicroService,
  ) {
    this.client = new Stripe(configService.get('STRIPE_SECRET'));
  }

  private async getTotalAmountAfterDiscount(
    unitAmount: number,
    ticketSalesId: string,
    discountCode?: string,
  ) {
    if (!discountCode) return [unitAmount, undefined];
    const discount = await this.discountsMicroService.validateCode(
      discountCode,
      ticketSalesId,
    );

    if (!discount) {
      throw new RpcException(new NotFoundException('Invalid discount code'));
    }

    switch (discount.kind) {
      case DiscountKind.PERCENTAGE:
        unitAmount = Math.max(
          0,
          unitAmount - unitAmount * (discount.amount / 100),
        );
        break;
      case DiscountKind.FIXED:
        unitAmount = Math.max(0, unitAmount - discount.amount);
        break;
    }

    return [unitAmount, discount.id];
  }

  async createCheckoutSession(checkoutDto: StripeCheckoutDto) {
    const {
      ticketSalesId,
      quantity,
      discountCode,
      email: ownerEmail,
    } = checkoutDto;
    const ticketSales = await this.ticketSalesMicroService.findOne(
      ticketSalesId,
      {
        name: true,
        description: true,
        price: true,
        quantity: true,
        event: {
          id: true,
          name: true,
          date: true,
        },
      },
    );

    if (!ticketSales) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    if (new Date(ticketSales.event.date) < new Date()) {
      throw new RpcException(
        new UnprocessableEntityException('Event has already passed'),
      );
    }

    if (ticketSales.quantity < quantity) {
      throw new RpcException(
        new UnprocessableEntityException('Not enough tickets available'),
      );
    }

    const [total, discountId] = await this.getTotalAmountAfterDiscount(
      ticketSales.price,
      ticketSalesId,
      discountCode,
    );

    const ticket = await this.ticketsMicroService.create({
      eventId: ticketSales.event.id as string,
      ticketSalesId,
      ownerEmail,
    });

    const checkoutSession = await this.client.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        ticketId: ticket.id,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60 * 24,
      line_items: [
        {
          price_data: {
            currency: this.configService.get('STRIPE_CURRENCY'),
            product_data: {
              name: ticketSales.name,
              description: ticketSales.description,
            },
            unit_amount: total,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    this.paymentService.create({
      ticketId: ticket.id,
      discountId,
      defaultPrice: ticketSales.price,
      payment: total,
      checkoutSessionId: checkoutSession.id,
    });

    return checkoutSession;
  }
}
