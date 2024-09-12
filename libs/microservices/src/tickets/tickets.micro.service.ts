import {
  CreateTicketDto,
  CreateTicketDuplicatesMessageDto,
  FindOneTicketMessageDto,
  FindTicketsOptionsDto,
  TicketsEventPatterns,
  TicketsMessagePatterns,
  TicketWithDetails,
  UpdateTicketDto,
  UpdateTicketMessageDto,
} from '@app/contracts/tickets';
import { Ticket, TicketSelectFieldsDto } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class TicketsMicroService {
  @Inject(NatsServices.TICKETS) private readonly client: ClientProxy;

  private send<T>(pattern: TicketsMessagePatterns, data: any): Promise<T> {
    const source = this.client.send<T>(pattern, data).pipe(timeout(5000));

    return firstValueFrom(source);
  }

  emit(pattern: TicketsEventPatterns, data: any) {
    this.client.emit(pattern, data);
  }

  create(dto: CreateTicketDto) {
    return this.send<string>(TicketsMessagePatterns.CREATE, dto);
  }

  createMany(dtos: CreateTicketDto[]): Promise<string[]> {
    return this.send<string[]>(TicketsMessagePatterns.CREATE_MANY, dtos);
  }

  createDuplicates(dto: CreateTicketDto, quantity: number): Promise<string[]> {
    return this.send<string[]>(TicketsMessagePatterns.CREATE_DUPLICATES, {
      dto,
      quantity,
    } as CreateTicketDuplicatesMessageDto);
  }

  findMany(options: FindTicketsOptionsDto) {
    return this.send<Ticket[]>(TicketsMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string, selectFields: TicketSelectFieldsDto) {
    return this.send<Ticket>(TicketsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOneTicketMessageDto);
  }

  findOneWithDetails(id: string): Promise<TicketWithDetails> {
    return this.send<TicketWithDetails>(
      TicketsMessagePatterns.FIND_ONE_WITH_DETAILS,
      {
        id,
      } as FindOneTicketMessageDto,
    );
  }

  update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    return this.send<Ticket>(TicketsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateTicketMessageDto);
  }

  remove(id: string): Promise<Ticket> {
    return this.send(TicketsMessagePatterns.DELETE, id);
  }
}
