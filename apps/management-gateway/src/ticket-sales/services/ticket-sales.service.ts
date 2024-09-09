import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import { TicketSalesMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketSalesService {
  constructor(
    private readonly ticketSalesMicroService: TicketSalesMicroService,
  ) {}

  create(dto: CreateTicketSalesDto) {
    return this.ticketSalesMicroService.create(dto);
  }

  findAll(options: FindTicketSalesOptionsDto) {
    return this.ticketSalesMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.ticketSalesMicroService.findOne(id);
  }

  update(id: string, dto: UpdateTicketSalesDto) {
    return this.ticketSalesMicroService.update(id, dto);
  }

  remove(id: string) {
    return this.ticketSalesMicroService.remove(id);
  }
}
