import { CreateStripeCheckoutDto } from '@app/contracts/payments';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { InjectStripe } from '../../providers';

@Injectable()
export class StripeService {
  @InjectStripe() private readonly client: Stripe;

  constructor(private readonly configService: ConfigService) {}

  async createCheckoutSession(checkoutDto: CreateStripeCheckoutDto) {
    const { name, description, unitPrice, quantity, metadata } = checkoutDto;

    const checkoutSession = await this.client.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: metadata,
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
      success_url: this.configService.get('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
    });

    return checkoutSession;
  }
}
