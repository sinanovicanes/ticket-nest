import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { EventsMicroService } from './events.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.EVENTS)],
  exports: [NatsModule, EventsMicroService],
  providers: [EventsMicroService],
})
export class EventsMicroServiceModule {}
