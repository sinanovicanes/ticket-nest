import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { TicketsMicroService } from './tickets.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.TICKETS)],
  exports: [NatsModule, TicketsMicroService],
  providers: [TicketsMicroService],
})
export class TicketsMicroServiceModule {}
