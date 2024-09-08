import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import { TicketSalesSelectFieldsDto } from '@app/database';
import { TicketSalesMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';
import { TicketSaleDto } from './dtos';

@Injectable()
export class TicketSalesService {
  constructor(
    private readonly ticketSalesMicroService: TicketSalesMicroService,
  ) {}

  create(dto: CreateTicketSalesDto) {
    return this.ticketSalesMicroService.create(dto);
  }

  async findMany(options: FindTicketSalesOptionsDto): Promise<TicketSaleDto[]> {
    const ticketSales = await this.ticketSalesMicroService.findMany(options);

    return ticketSales.map(TicketSaleDto.fromEntity);
  }

  async findOne(id: string): Promise<TicketSaleDto> {
    const ticketSale = await this.ticketSalesMicroService.findOne(id);

    return TicketSaleDto.fromEntity(ticketSale);
  }

  findOneWithEventDetails(id: string) {
    return this.ticketSalesMicroService.findOneWithEventDetails(id);
  }

  update(id: string, dto: UpdateTicketSalesDto) {
    return this.ticketSalesMicroService.update(id, dto);
  }

  remove(id: string) {
    return this.ticketSalesMicroService.remove(id);
  }
}
