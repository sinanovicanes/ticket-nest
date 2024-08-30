import {
  DiscountsMicroService,
  PaymentsMicroService,
  TicketSalesMicroService,
  TicketsMicroService,
} from '@app/microservices';
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dtos';
import { CreateStripeCheckoutDto } from '@app/contracts/payments';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly paymentsMicroService: PaymentsMicroService,
    private readonly ticketsMicroService: TicketsMicroService,
    private readonly ticketSalesMicroService: TicketSalesMicroService,
    private readonly discountsMicroService: DiscountsMicroService,
  ) {}

  async create(checkoutDto: CreateCheckoutDto) {
    const { ticketSalesId, discountCode, email, quantity } = checkoutDto;
    const ticketSales =
      await this.ticketSalesMicroService.findByIdIfAvailable(ticketSalesId);

    let [discountId, newPrice] = [undefined, ticketSales.price];

    if (discountCode) {
      [discountId, newPrice] = await this.discountsMicroService.validateCode(
        discountCode,
        ticketSalesId,
      );
    }

    const ticketIds = await this.ticketsMicroService.createDuplicates(
      {
        eventId: ticketSales.event.id,
        ticketSalesId,
        ownerEmail: email,
      },
      quantity,
    );

    const checkoutSession =
      await this.paymentsMicroService.createCheckoutSession({
        name: `${ticketSales.event.name} | ${ticketSales.name}`,
        description: ticketSales.description,
        unitPrice: newPrice,
        quantity,
        metadata: {
          ticketIds: JSON.stringify(ticketIds),
          discountId,
        },
      });

    await this.paymentsMicroService.create({
      checkoutSessionId: checkoutSession.id,
      defaultPrice: ticketSales.price,
      payment: checkoutSession.amount_total,
      ticketId: ticketIds[0],
      discountId,
    });

    return checkoutSession;
  }
}
