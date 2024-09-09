import { AddEventImageDto, EventsEventPatterns } from '@app/contracts/events';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { StorageMicroService } from '@app/microservices';

@Controller()
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);
  constructor(
    private readonly imagesService: ImagesService,
    private readonly storageMicroService: StorageMicroService,
  ) {}

  @EventPattern(EventsEventPatterns.ADD_IMAGE)
  async addImage({ eventId, url }: AddEventImageDto) {
    this.imagesService.addImage(eventId, url);
  }

  @EventPattern(EventsEventPatterns.REMOVE_IMAGE)
  async removeImage(imageId: string) {
    try {
      const { url } = await this.imagesService.removeImage(imageId);
      this.storageMicroService.delete(url);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @EventPattern(EventsEventPatterns.REMOVE_IMAGE_BY_URL)
  removeImageByURL(url: string) {
    this.imagesService.removeImageByURL(url);
  }
}
