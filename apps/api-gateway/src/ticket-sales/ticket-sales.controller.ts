import { FindTicketSalesQueryDto } from '@app/contracts/ticket-sales';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { TicketSalesService } from './ticket-sales.service';

@Controller('events/:eventId/ticket-sales')
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @Get()
  findMany(
    @Param('eventId') eventId: string,
    @Query() options: FindTicketSalesQueryDto,
  ) {
    // Add eventId to options
    options.eventId = eventId;
    return this.ticketSalesService.findMany({
      ...options,
      selectFields: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSalesService.findOne(id, {
      id: true,
      name: true,
      description: true,
      price: true,
      createdAt: true,
      event: {
        id: true,
        name: true,
        description: true,
        date: true,
        location: {
          id: true,
          name: true,
          address: true,
          address2: true,
          city: true,
          province: true,
        },
      },
    });
  }
}
