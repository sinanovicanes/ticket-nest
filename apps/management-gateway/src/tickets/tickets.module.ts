import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketsMicroService } from '@app/microservices';

@Module({
  imports: [TicketsMicroService],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
