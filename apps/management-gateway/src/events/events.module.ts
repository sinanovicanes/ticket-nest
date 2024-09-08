import {
  EventsMicroServiceModule,
  StorageMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { EventImagesController } from './controllers/event-images.controller';
import { EventsController } from './controllers/events.controller';
import { EventImagesService } from './services/event-images.service';
import { EventsService } from './services/events.service';

@Module({
  imports: [EventsMicroServiceModule, StorageMicroServiceModule],
  controllers: [EventsController, EventImagesController],
  providers: [EventsService, EventImagesService],
})
export class EventsModule {}
