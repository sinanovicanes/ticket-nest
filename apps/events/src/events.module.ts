import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { DatabaseModule } from '@app/database';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [DatabaseModule, ImagesModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
