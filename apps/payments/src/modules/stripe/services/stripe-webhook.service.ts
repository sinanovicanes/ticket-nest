import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Stripe } from 'stripe';
import {
  CheckoutSessionCompletedEvent,
  CheckoutSessionExpiredEvent,
} from '../../../events';

@Injectable()
export class StripeWebhookService {
  private readonly logger: Logger = new Logger(StripeWebhookService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async handleEvent(event: Stripe.Event) {
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
