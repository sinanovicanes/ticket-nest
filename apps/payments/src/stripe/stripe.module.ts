import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {
  DiscountsMicroServiceModule,
  TicketSalesMicroServiceModule,
  TicketsMicroServiceModule,
} from '@app/microservices';

@Module({
  imports: [
    TicketSalesMicroServiceModule,
    TicketsMicroServiceModule,
    DiscountsMicroServiceModule,
  ],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
