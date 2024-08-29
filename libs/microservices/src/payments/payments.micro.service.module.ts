import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { PaymentsMicroService } from './payments.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.PAYMENTS)],
  exports: [NatsModule, PaymentsMicroService],
  providers: [PaymentsMicroService],
})
export class PaymentsMicroServiceModule {}
