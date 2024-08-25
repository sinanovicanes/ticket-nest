import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
