import { Module } from '@nestjs/common';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesService } from './ticket-sales.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
