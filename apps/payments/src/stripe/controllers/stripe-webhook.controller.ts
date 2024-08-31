import {
  PaymentsMessagePatterns,
  StripeWebhookMessageDto,
} from '@app/contracts/payments';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StripeWebhookService } from '../services/stripe-webhook.service';

@Controller()
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @MessagePattern(PaymentsMessagePatterns.STRIPE_WEBHOOK)
  handleStripeWebhook(
    @Payload() { signature, payload }: StripeWebhookMessageDto,
  ) {
    return this.stripeWebhookService.handleStripeWebhook(signature, payload);
  }
}
