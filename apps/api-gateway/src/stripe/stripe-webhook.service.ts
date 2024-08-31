import { InjectStripe } from '@app/common/providers';
import { PaymentsMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  @InjectStripe() private readonly client: Stripe;

  constructor(private readonly paymentsMicroService: PaymentsMicroService) {}

  private validateSignature(signature: string, payload: Buffer): Stripe.Event {
    try {
      return this.client.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      throw new Error('Invalid signature');
    }
  }

  async handleRequest(signature: string, payload: Buffer) {
    const event = this.validateSignature(signature, payload);
    await this.paymentsMicroService.emitStripeWebhookEvent(event);
  }
}
