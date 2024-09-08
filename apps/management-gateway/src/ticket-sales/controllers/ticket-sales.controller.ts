import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketSalesService } from '../services/ticket-sales.service';

@Controller('ticket-sales')
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @Post()
  create(@Body() createTicketSaleDto: CreateTicketSalesDto) {
    return this.ticketSalesService.create(createTicketSaleDto);
  }

  @Get()
  findAll(@Query() query: FindTicketSalesOptionsDto) {
    return this.ticketSalesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSalesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketSaleDto: UpdateTicketSalesDto,
  ) {
    return this.ticketSalesService.update(id, updateTicketSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketSalesService.remove(id);
  }
}
