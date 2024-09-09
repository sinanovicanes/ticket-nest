import { ImageFileValidationPipe } from '@app/common/pipes';
import { StorageMicroService } from '@app/microservices';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventImagesService } from '../services/event-images.service';
import { DeleteEventImageDto } from '../dtos';

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
    const imageName = this.eventImagesService.generateImageName();
    const fileExtension = file.originalname.split('.').pop();

    // File name is the key in the storage service
    file.originalname = `${imageName}.${fileExtension}`;

    // Upload the file to the storage service
    const url = await this.storageMicroService.upload(file);

    // Save the image URL in the events service
    this.eventImagesService.addImage(eventId, url);

    return url;
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByURL(@Body() { url }: DeleteEventImageDto) {
    this.storageMicroService.delete(url);
    this.eventImagesService.removeImageByURL(url);
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('imageId', ParseUUIDPipe) imageId: string) {
    this.eventImagesService.removeImage(imageId);
  }
}
