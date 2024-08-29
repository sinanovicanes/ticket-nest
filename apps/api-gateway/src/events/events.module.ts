import { EventsMicroServiceModule } from '@app/microservices';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [EventsMicroServiceModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
