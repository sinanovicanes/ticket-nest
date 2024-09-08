import { AddEventImageDto, EventsEventPatterns } from '@app/contracts/events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @EventPattern(EventsEventPatterns.ADD_IMAGE)
  async addImage({ eventId, url }: AddEventImageDto) {
    this.imagesService.addImage(eventId, url);
  }

  @EventPattern(EventsEventPatterns.REMOVE_IMAGE)
  async removeImage(url: string) {
    this.imagesService.removeImage(url);
  }
}
