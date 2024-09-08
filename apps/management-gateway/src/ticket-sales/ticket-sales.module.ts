import {
  StorageMicroServiceModule,
  TicketSalesMicroServiceModule,
} from '@app/microservices';
import { Module } from '@nestjs/common';
import { TicketSalesImagesController } from './controllers/ticket-sales-images.controller';
import { TicketSalesController } from './controllers/ticket-sales.controller';
import { TicketSalesImagesService } from './services/ticket-sales-images.service';
import { TicketSalesService } from './services/ticket-sales.service';

@Module({
  imports: [TicketSalesMicroServiceModule, StorageMicroServiceModule],
  controllers: [TicketSalesController, TicketSalesImagesController],
  providers: [TicketSalesService, TicketSalesImagesService],
})
export class TicketSalesModule {}
