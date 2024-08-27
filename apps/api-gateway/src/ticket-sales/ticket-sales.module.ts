import { Module } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';
import { TicketSalesController } from './ticket-sales.controller';
import { NatsModule, NatsServices } from '@app/common/nats';

@Module({
  imports: [NatsModule.register(NatsServices.TICKET_SALES)],
  controllers: [TicketSalesController],
  providers: [TicketSalesService],
})
export class TicketSalesModule {}
