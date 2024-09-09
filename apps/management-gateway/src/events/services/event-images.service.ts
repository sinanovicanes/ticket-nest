import { EventsMicroService } from '@app/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class EventImagesService {
  private readonly logger = new Logger(EventImagesService.name);
  constructor(private readonly eventsMicroService: EventsMicroService) {}

  generateImageName() {
    return `events-${randomUUID()}`;
  }

  addImage(eventId: string, url: string) {
    this.logger.log(`Adding image to event ${eventId}`);
    this.eventsMicroService.addImage(eventId, url);
  }

  removeImage(imageId: string) {
    this.logger.log(`Removing image ${imageId}`);
    this.eventsMicroService.removeImage(imageId);
  }

  removeImageByURL(url: string) {
    this.logger.log(`Removing image by url ${url}`);
    this.eventsMicroService.removeImageByURL(url);
  }
}
