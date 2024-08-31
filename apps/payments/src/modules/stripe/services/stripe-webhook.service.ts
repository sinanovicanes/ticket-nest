import { InjectStripe } from '@app/common/providers';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RpcException } from '@nestjs/microservices';
import { Stripe } from 'stripe';
import {
  CheckoutSessionCompletedEvent,
  CheckoutSessionExpiredEvent,
} from '../../../events';

@Injectable()
export class StripeWebhookService {
  @InjectStripe() private readonly client: Stripe;
  private readonly logger: Logger = new Logger(StripeWebhookService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  validateSignature(signature: string, payload: Buffer): Stripe.Event {
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

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const event = this.validateSignature(signature, payload);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        this.logger.log(`Checkout session completed: ${session.id}`);

        await this.eventEmitter.emitAsync(
          CheckoutSessionCompletedEvent.name,
          new CheckoutSessionCompletedEvent(session),
        );
        break;
      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        this.logger.log(`Checkout session expired: ${expiredSession.id}`);

        await this.eventEmitter.emitAsync(
          CheckoutSessionExpiredEvent.name,
          new CheckoutSessionExpiredEvent(expiredSession),
        );
        break;
      default:
        this.logger.warn(`Unhandled event type: ${event.type}`);
        break;
    }
  }
}
