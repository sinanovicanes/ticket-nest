import { PaymentsEventPatterns } from '@app/contracts/payments';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type Stripe from 'stripe';
import { StripeWebhookService } from '../services/stripe-webhook.service';

@Controller()
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @EventPattern(PaymentsEventPatterns.STRIPE_WEBHOOK_EVENT)
  handleStripeWebhookEvent(@Payload() event: Stripe.Event) {
    return this.stripeWebhookService.handleEvent(event);
  }
}
