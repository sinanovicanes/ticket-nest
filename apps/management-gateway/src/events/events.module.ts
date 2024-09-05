import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsMicroServiceModule } from '@app/microservices';

@Module({
  imports: [EventsMicroServiceModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
