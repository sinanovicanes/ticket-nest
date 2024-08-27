import { Controller, Get } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';

@Controller()
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @Get()
  getHello(): string {
    return this.ticketSalesService.getHello();
  }
}
