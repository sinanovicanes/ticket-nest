import { CreateStripeCheckoutDto } from '@app/contracts/payments';
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

  constructor(private readonly configService: ConfigService) {
    this.client = new Stripe(configService.get('STRIPE_SECRET'));
  }

  async createCheckoutSession(checkoutDto: CreateStripeCheckoutDto) {
    const { name, description, unitPrice, quantity, expiresAt, metadata } =
      checkoutDto;

    const checkoutSession = await this.client.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: metadata,
      expires_at: expiresAt,
      line_items: [
        {
          price_data: {
            currency: this.configService.get('STRIPE_CURRENCY'),
            product_data: {
              name,
              description,
            },
            unit_amount: unitPrice,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return checkoutSession;
  }
}
