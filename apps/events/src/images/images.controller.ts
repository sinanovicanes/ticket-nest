import {
  EventsEventPatterns,
  EventsMessagePatterns,
  UploadEventImageDto,
} from '@app/contracts/events';
import { StorageMicroService } from '@app/microservices';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly storageMicroService: StorageMicroService,
  ) {}

  @MessagePattern(EventsMessagePatterns.UPLOAD_IMAGE)
  async uploadImage({ eventId, file }: UploadEventImageDto): Promise<string> {
    const imageId = await this.imagesService.generateUUID();
    file.originalname = `events-${imageId}.${file.originalname.split('.').pop()}`;
    const url = await this.storageMicroService.upload(file);

    await this.imagesService.saveImageWithId(imageId, eventId, url);

    return url;
  }

  @EventPattern(EventsEventPatterns.DELETE_IMAGE)
  async deleteImageByURL(url: string) {
    this.storageMicroService.delete(url);
    this.imagesService.deleteImageByURL(url);
  }
}
