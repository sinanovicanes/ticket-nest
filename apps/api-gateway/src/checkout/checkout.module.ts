import {
  PaymentsMicroServiceModule,
  TicketSalesMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [PaymentsMicroServiceModule, TicketSalesMicroServiceModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
