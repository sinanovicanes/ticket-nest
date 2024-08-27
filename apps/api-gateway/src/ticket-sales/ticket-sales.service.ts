import { NatsServices } from '@app/common/nats';
import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  TicketSalesMessagePatterns,
  UpdateTicketSalesDto,
  UpdateTicketSalesMessageDto,
} from '@app/contracts/ticket-sales';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TicketSalesService {
  @Inject(NatsServices.TICKET_SALES) private readonly client: ClientProxy;

  create(dto: CreateTicketSalesDto) {
    return this.client.send(TicketSalesMessagePatterns.CREATE, dto);
  }

  findMany(options: FindTicketSalesOptionsDto) {
    return this.client.send(TicketSalesMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string) {
    return this.client.send(TicketSalesMessagePatterns.FIND_ONE, id);
  }

  update(id: string, dto: UpdateTicketSalesDto) {
    return this.client.send(TicketSalesMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateTicketSalesMessageDto);
  }

  remove(id: string) {
    return this.client.send(TicketSalesMessagePatterns.DELETE, id);
  }
}
