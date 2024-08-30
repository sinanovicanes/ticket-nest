import {
  DiscountsMicroServiceModule,
  PaymentsMicroServiceModule,
  TicketSalesMicroServiceModule,
  TicketsMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [
    PaymentsMicroServiceModule,
    TicketsMicroServiceModule,
    TicketSalesMicroServiceModule,
    DiscountsMicroServiceModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
