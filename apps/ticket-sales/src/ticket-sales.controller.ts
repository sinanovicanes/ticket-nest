import {
  CreateTicketSalesDto,
  FindOneTicketSalesMessageDto,
  FindTicketSalesOptionsDto,
  TicketSalesMessagePatterns,
  UpdateTicketSalesMessageDto,
} from '@app/contracts/ticket-sales';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketSalesService } from './ticket-sales.service';

@Controller()
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @MessagePattern(TicketSalesMessagePatterns.CREATE)
  create(@Payload() dto: CreateTicketSalesDto) {
    return this.ticketSalesService.create(dto);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindTicketSalesOptionsDto) {
    return this.ticketSalesService.findMany(options);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_ONE)
  findOne(@Payload() { id, selectFields }: FindOneTicketSalesMessageDto) {
    return this.ticketSalesService.findOne(id, selectFields);
  }

  @MessagePattern(TicketSalesMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketSalesMessageDto) {
    return this.ticketSalesService.updateOne(id, dto);
  }

  @MessagePattern(TicketSalesMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketSalesService.delete(id);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_BY_ID_IF_AVAILABLE)
  findByIdIfAvailable(@Payload() id: string) {
    return this.ticketSalesService.findByIdIfAvailable(id);
  }
}
