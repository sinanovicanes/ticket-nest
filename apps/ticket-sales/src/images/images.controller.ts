import {
  AddTicketSalesImageDto,
  TicketSalesEventPatterns,
} from '@app/contracts/ticket-sales';
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

  @EventPattern(TicketSalesEventPatterns.ADD_IMAGE)
  addImage({ ticketSalesId, url }: AddTicketSalesImageDto) {
    this.imagesService.addImage(ticketSalesId, url);
  }

  @EventPattern(TicketSalesEventPatterns.REMOVE_IMAGE)
  async removeImage(imageId: string) {
    try {
      const { url } = await this.imagesService.removeImage(imageId);
      this.storageMicroService.delete(url);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @EventPattern(TicketSalesEventPatterns.REMOVE_IMAGE_BY_URL)
  removeImageByURL(url: string) {
    this.imagesService.removeImageByURL(url);
  }
}
