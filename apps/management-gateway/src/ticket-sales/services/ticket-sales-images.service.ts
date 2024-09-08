import { TicketSalesMicroService } from '@app/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class TicketSalesImagesService {
  private readonly logger = new Logger(TicketSalesImagesService.name);
  constructor(
    private readonly ticketSalesMicroService: TicketSalesMicroService,
  ) {}

  generateImageId() {
    return `ticket-sales-${randomUUID()}`;
  }

  addImage(ticketSalesId: string, url: string) {
    this.logger.log(`Adding image to ticket sales ${ticketSalesId}`);
    this.ticketSalesMicroService.addImage(ticketSalesId, url);
  }

  removeImage(url: string) {
    this.logger.log(`Removing image ${url}`);
    this.ticketSalesMicroService.removeImage(url);
  }
}
