import {
  CreateTicketDto,
  FindOneTicketMessageDto,
  FindTicketOptionsDto,
  TicketsMessagePatterns,
  UpdateTicketMessageDto,
} from '@app/contracts/tickets';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @MessagePattern(TicketsMessagePatterns.CREATE)
  create(@Payload() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @MessagePattern(TicketsMessagePatterns.CREATE_MANY)
  createMany(@Payload() dtos: CreateTicketDto[]) {
    return this.ticketsService.createMany(dtos);
  }

  @MessagePattern(TicketsMessagePatterns.CREATE_DUPLICATES)
  createDuplicates(
    @Payload() { dto, quantity }: { dto: CreateTicketDto; quantity: number },
  ) {
    return this.ticketsService.createDuplicates(dto, quantity);
  }

  @MessagePattern(TicketsMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindTicketOptionsDto) {
    return this.ticketsService.findMany(options);
  }

  @MessagePattern(TicketsMessagePatterns.FIND_ONE)
  findOne(@Payload() { id, selectFields }: FindOneTicketMessageDto) {
    return this.ticketsService.findOne(id, selectFields);
  }

  @MessagePattern(TicketsMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketMessageDto) {
    return this.ticketsService.updateOne(id, dto);
  }

  @MessagePattern(TicketsMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketsService.delete(id);
  }
}
