import { Module } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesMicroServiceModule } from '@app/microservices';

@Module({
  imports: [TicketSalesMicroServiceModule],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
