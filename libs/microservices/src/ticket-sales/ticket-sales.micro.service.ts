import { NatsServices } from '@app/microservices';
import {
  CreateTicketSalesDto,
  FindOneTicketSalesMessageDto,
  FindTicketSalesOptionsDto,
  TicketSalesMessagePatterns,
  UpdateTicketSalesDto,
  UpdateTicketSalesMessageDto,
} from '@app/contracts/ticket-sales';
import { TicketSalesSelectFieldsDto } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TicketSalesMicroService {
  @Inject(NatsServices.TICKET_SALES) private readonly client: ClientProxy;

  create(dto: CreateTicketSalesDto) {
    const source = this.client.send(TicketSalesMessagePatterns.CREATE, dto);

    return firstValueFrom(source);
  }

  findMany(options: FindTicketSalesOptionsDto) {
    const source = this.client.send(
      TicketSalesMessagePatterns.FIND_MANY,
      options,
    );

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: TicketSalesSelectFieldsDto) {
    const source = this.client.send(TicketSalesMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOneTicketSalesMessageDto);

    return firstValueFrom(source);
  }

  findByIdIfAvailable(id: string) {
    const source = this.client.send(
      TicketSalesMessagePatterns.FIND_BY_ID_IF_AVAILABLE,
      id,
    );

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateTicketSalesDto) {
    const source = this.client.send(TicketSalesMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateTicketSalesMessageDto);

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client.send(TicketSalesMessagePatterns.DELETE, id);

    return firstValueFrom(source);
  }
}
