import { Stripe } from 'stripe';
import { InjectStripe } from '../../providers';
import { RpcException } from '@nestjs/microservices';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeWebhookService {
  @InjectStripe() private readonly client: Stripe;
  private readonly logger: Logger = new Logger(StripeWebhookService.name);

  constructor(private readonly configService: ConfigService) {}

  validateSignature(signature: string, payload: any): Stripe.Event {
    try {
      return this.client.webhooks.constructEvent(
        payload,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (error) {
      throw new RpcException(new ForbiddenException('Invalid signature'));
    }
  }

  async handleStripeWebhook(signature: string, payload: any) {
    const event = this.validateSignature(signature, payload);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        this.logger.log(`Payment was successful: ${session.id}`);
        break;
      case 'checkout.session.async_payment_succeeded':
        const asyncSession = event.data.object;
        this.logger.log(`Payment was successful: ${asyncSession.id}`);
        break;
      case 'checkout.session.async_payment_failed':
        const failedSession = event.data.object;
        this.logger.log(`Payment failed: ${failedSession.id}`);
        break;
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
        break;
    }
  }
}
