import { StripeProvider } from '@app/common/providers';
import {
  PaymentsMicroServiceModule,
  TicketSalesMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { StripeWebhookService } from './stripe-webhook.service';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [PaymentsMicroServiceModule, TicketSalesMicroServiceModule],
  controllers: [StripeController],
  providers: [StripeProvider, StripeService, StripeWebhookService],
})
export class StripeModule {}
