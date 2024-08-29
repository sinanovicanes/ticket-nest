import { TicketSalesMicroServiceModule } from '@app/microservices';
import { Module } from '@nestjs/common';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesService } from './ticket-sales.service';

@Module({
  imports: [TicketSalesMicroServiceModule],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
