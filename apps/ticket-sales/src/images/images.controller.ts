import {
  AddTicketSalesImageDto,
  TicketSalesEventPatterns,
} from '@app/contracts/ticket-sales';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @EventPattern(TicketSalesEventPatterns.ADD_IMAGE)
  addImage({ ticketSalesId, url }: AddTicketSalesImageDto) {
    this.imagesService.addImage(ticketSalesId, url);
  }

  @EventPattern(TicketSalesEventPatterns.REMOVE_IMAGE)
  removeImage(url: string) {
    this.imagesService.removeImage(url);
  }
}
