import {
  CreateTicketDto,
  FindOneTicketMessageDto,
  FindTicketOptionsDto,
  TicketMessagePatterns,
  UpdateTicketMessageDto,
} from '@app/contracts/tickets';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern(TicketMessagePatterns.CREATE)
  create(@Payload() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @MessagePattern(TicketMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindTicketOptionsDto) {
    return this.ticketsService.findMany(options);
  }

  @MessagePattern(TicketMessagePatterns.FIND_ONE)
  findOne(@Payload() { id, selectFields }: FindOneTicketMessageDto) {
    return this.ticketsService.findOne(id, selectFields);
  }

  @MessagePattern(TicketMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketMessageDto) {
    return this.ticketsService.updateOne(id, dto);
  }

  @MessagePattern(TicketMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketsService.delete(id);
  }
}
