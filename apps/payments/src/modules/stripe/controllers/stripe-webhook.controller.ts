import { PaymentsEventPatterns } from '@app/contracts/payments';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type Stripe from 'stripe';
import { StripeWebhookService } from '../services/stripe-webhook.service';

@Controller()
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @EventPattern(PaymentsEventPatterns.STRIPE_WEBHOOK_EVENT)
  async handleStripeWebhookEvent(@Payload() event: Stripe.Event) {
    try {
      await this.stripeWebhookService.handleEvent(event);
    } catch {
      this.logger.error('Failed to handle Stripe webhook event');
    }
  }
}
