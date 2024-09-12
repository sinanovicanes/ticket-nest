import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { DatabaseModule } from '@app/database';
import { PaymentEventController } from './payment.event.controller';
import { TicketsMicroServiceModule } from '@app/microservices';

@Module({
  imports: [DatabaseModule, TicketsMicroServiceModule],
  controllers: [TicketsController, PaymentEventController],
  providers: [TicketsService],
})
export class TicketsModule {}
