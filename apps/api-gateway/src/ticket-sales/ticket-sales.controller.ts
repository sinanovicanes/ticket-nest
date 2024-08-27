import { Controller, Get, Param } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';

@Controller('ticket-sales')
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @Get()
  findAll() {
    return this.ticketSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSalesService.findOne(id);
  }
}
