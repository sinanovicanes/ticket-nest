import {
  CreateTicketSalesDto,
  FindOneTicketSalesMessageDto,
  FindTicketSalesOptionsDto,
  ReserveTicketsMessageDto,
  TicketSalesMessagePatterns,
  UpdateTicketSalesDto,
  UpdateTicketSalesMessageDto,
} from '@app/contracts/ticket-sales';
import { TicketSalesSelectFieldsDto } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class TicketSalesMicroService {
  @Inject(NatsServices.TICKET_SALES) private readonly client: ClientProxy;

  create(dto: CreateTicketSalesDto) {
    const source = this.client
      .send(TicketSalesMessagePatterns.CREATE, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findMany(options: FindTicketSalesOptionsDto) {
    const source = this.client
      .send(TicketSalesMessagePatterns.FIND_MANY, options)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: TicketSalesSelectFieldsDto) {
    const source = this.client
      .send(TicketSalesMessagePatterns.FIND_ONE, {
        id,
        selectFields,
      } as FindOneTicketSalesMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findByIdIfAvailable(id: string) {
    const source = this.client
      .send(TicketSalesMessagePatterns.FIND_BY_ID_IF_AVAILABLE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  reserveTickets(id: string, quantity: number) {
    const source = this.client
      .send(TicketSalesMessagePatterns.RESERVE_TICKETS, {
        id,
        quantity,
      } as ReserveTicketsMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateTicketSalesDto) {
    const source = this.client
      .send(TicketSalesMessagePatterns.UPDATE, {
        id,
        dto,
      } as UpdateTicketSalesMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client
      .send(TicketSalesMessagePatterns.DELETE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }
}
