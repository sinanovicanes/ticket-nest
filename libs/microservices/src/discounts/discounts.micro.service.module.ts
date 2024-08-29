import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { DiscountsMicroService } from './discounts.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.DISCOUNTS)],
  exports: [NatsModule, DiscountsMicroService],
  providers: [DiscountsMicroService],
})
export class DiscountsMicroServiceModule {}
