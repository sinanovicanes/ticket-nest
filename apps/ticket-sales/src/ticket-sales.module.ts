import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesService } from './ticket-sales.service';

@Module({
  imports: [DatabaseModule, ImagesModule],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
