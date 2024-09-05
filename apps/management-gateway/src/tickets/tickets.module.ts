import { TicketsMicroServiceModule } from '@app/microservices';
import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TicketsMicroServiceModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
