import { FindTicketSalesOptionsDto } from '@app/contracts/ticket-sales';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';

@Controller('events/:eventId/ticket-sales')
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @Get()
  findMany(
    @Param('eventId') eventId: string,
    @Query() options: FindTicketSalesOptionsDto,
  ) {
    // Add eventId to options
    options.eventId = eventId;
    return this.ticketSalesService.findMany(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSalesService.findOneWithEventDetails(id);
  }
}
