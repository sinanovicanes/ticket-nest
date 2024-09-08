import { ImageFileValidationPipe } from '@app/common/pipes';
import { StorageMicroService } from '@app/microservices';
import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventImagesService } from '../services/event-images.service';

// TODO: Add guard to check if event exists
@Controller('events/:eventId/images')
export class EventImagesController {
  constructor(
    private readonly eventImagesService: EventImagesService,
    private readonly storageMicroService: StorageMicroService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('eventId') eventId: string,
    @UploadedFile(new ImageFileValidationPipe())
    file: Express.Multer.File,
  ) {
    const imageId = this.eventImagesService.generateImageId();
    const fileExtension = file.originalname.split('.').pop();

    // File name is the key in the storage service
    file.originalname = `${imageId}.${fileExtension}`;

    // Upload the file to the storage service
    const url = await this.storageMicroService.upload(file);

    // Save the image URL in the events service
    this.eventImagesService.addImage(eventId, url);

    return url;
  }
}
