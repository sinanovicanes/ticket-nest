import { NatsServices } from '@app/microservices';
import {
  CreateTicketDto,
  FindOneTicketMessageDto,
  FindTicketOptionsDto,
  TicketsMessagePatterns,
  UpdateTicketDto,
  UpdateTicketMessageDto,
} from '@app/contracts/tickets';
import { TicketSelectFieldsDto } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TicketsMicroService {
  @Inject(NatsServices.TICKETS) private readonly client: ClientProxy;

  create(dto: CreateTicketDto) {
    return this.client.send(TicketsMessagePatterns.CREATE, dto);
  }

  findMany(options: FindTicketOptionsDto) {
    return this.client.send(TicketsMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string, selectFields: TicketSelectFieldsDto) {
    return this.client.send(TicketsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOneTicketMessageDto);
  }

  update(id: string, dto: UpdateTicketDto) {
    return this.client.send(TicketsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateTicketMessageDto);
  }

  remove(id: string) {
    return this.client.send(TicketsMessagePatterns.DELETE, id);
  }
}
