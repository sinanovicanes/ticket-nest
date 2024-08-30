import { CreateStripeCheckoutDto } from '@app/contracts/payments';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private readonly client: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.client = new Stripe(configService.get('STRIPE_SECRET'));
  }

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
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return checkoutSession;
  }
}
