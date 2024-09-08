import { ImageFileValidationPipe } from '@app/common/pipes';
import { StorageMicroService } from '@app/microservices';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TicketSalesImagesService } from '../services/ticket-sales-images.service';
import { DeleteTicketSalesImageDto } from '../dtos';

// TODO: Add guard to check if ticket sales exists
@Controller('ticket-sales/:ticketSalesId/images')
export class TicketSalesImagesController {
  constructor(
    private readonly ticketSalesImagesService: TicketSalesImagesService,
    private readonly storageMicroService: StorageMicroService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('ticketSalesId') ticketSalesId: string,
    @UploadedFile(new ImageFileValidationPipe())
    file: Express.Multer.File,
  ) {
    const imageId = this.ticketSalesImagesService.generateImageId();
    const fileExtension = file.originalname.split('.').pop();

    // File name is the key in the storage service
    file.originalname = `${imageId}.${fileExtension}`;

    // Upload the file to the storage service
    const url = await this.storageMicroService.upload(file);

    // Save the image URL in the events service
    this.ticketSalesImagesService.addImage(ticketSalesId, url);

    return url;
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Body() { url }: DeleteTicketSalesImageDto) {
    this.storageMicroService.delete(url);
    this.ticketSalesImagesService.removeImage(url);
  }
}
