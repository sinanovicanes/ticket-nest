import { StripeProvider } from '@app/common/providers';
import { Module } from '@nestjs/common';
import { StripeWebhookController } from './controllers/stripe-webhook.controller';
import { StripeController } from './controllers/stripe.controller';
import { StripeWebhookService } from './services/stripe-webhook.service';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [],
  controllers: [StripeController, StripeWebhookController],
  providers: [StripeProvider, StripeService, StripeWebhookService],
  exports: [StripeProvider, StripeService, StripeWebhookService],
})
export class StripeModule {}
