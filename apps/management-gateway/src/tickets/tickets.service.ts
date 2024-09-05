import {
  CreateTicketDto,
  FindTicketsOptionsDto,
  UpdateTicketDto,
} from '@app/contracts/tickets';
import { TicketsMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsMicroService: TicketsMicroService) {}

  create(dto: CreateTicketDto) {
    return this.ticketsMicroService.create(dto);
  }

  findAll(options: FindTicketsOptionsDto) {
    return this.ticketsMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.ticketsMicroService.findOne(id, {});
  }

  update(id: string, dto: UpdateTicketDto) {
    return this.ticketsMicroService.update(id, dto);
  }

  remove(id: string) {
    return this.ticketsMicroService.remove(id);
  }
}
