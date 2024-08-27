import { Module } from '@nestjs/common';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesService } from './ticket-sales.service';

@Module({
  imports: [],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
