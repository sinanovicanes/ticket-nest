import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { TicketSalesMicroService } from './ticket-sales.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.TICKET_SALES)],
  exports: [NatsModule, TicketSalesMicroService],
  providers: [TicketSalesMicroService],
})
export class TicketSalesMicroServiceModule {}
