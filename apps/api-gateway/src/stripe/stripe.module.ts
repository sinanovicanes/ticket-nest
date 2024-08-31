import {
  PaymentsMicroServiceModule,
  TicketSalesMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [PaymentsMicroServiceModule, TicketSalesMicroServiceModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
