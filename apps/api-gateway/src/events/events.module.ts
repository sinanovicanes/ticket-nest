import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { NatsModule, NatsServices } from '@app/common/nats';

@Module({
  imports: [NatsModule.register(NatsServices.EVENTS)],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
