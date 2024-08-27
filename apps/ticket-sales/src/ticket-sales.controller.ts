import {
  CreateTicketSalesDto,
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
  findOne(@Payload() id: string) {
    return this.ticketSalesService.findOne(id);
  }

  @MessagePattern(TicketSalesMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketSalesMessageDto) {
    return this.ticketSalesService.updateOne(id, dto);
  }

  @MessagePattern(TicketSalesMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketSalesService.delete(id);
  }
}
