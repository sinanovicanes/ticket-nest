import { NatsServices } from '@app/microservices';
import {
  CreateTicketDuplicatesMessageDto,
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
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TicketsMicroService {
  @Inject(NatsServices.TICKETS) private readonly client: ClientProxy;

  create(dto: CreateTicketDto) {
    const source = this.client.send(TicketsMessagePatterns.CREATE, dto);

    return firstValueFrom(source);
  }

  createMany(dtos: CreateTicketDto[]): Promise<string[]> {
    const source = this.client.send<string[]>(
      TicketsMessagePatterns.CREATE_MANY,
      dtos,
    );

    return firstValueFrom(source);
  }

  createDuplicates(dto: CreateTicketDto, quantity: number): Promise<string[]> {
    const source = this.client.send<string[]>(
      TicketsMessagePatterns.CREATE_DUPLICATES,
      {
        dto,
        quantity,
      } as CreateTicketDuplicatesMessageDto,
    );

    return firstValueFrom(source);
  }

  findMany(options: FindTicketOptionsDto) {
    const source = this.client.send(TicketsMessagePatterns.FIND_MANY, options);

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: TicketSelectFieldsDto) {
    const source = this.client.send(TicketsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOneTicketMessageDto);

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateTicketDto) {
    const source = this.client.send(TicketsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateTicketMessageDto);

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client.send(TicketsMessagePatterns.DELETE, id);

    return firstValueFrom(source);
  }
}
