import { NatsServices } from '@app/microservices';
import {
  CreateEventDto,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventDto,
  UpdateEventMessageDto,
} from '@app/contracts/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsMicroService {
  @Inject(NatsServices.EVENTS) private readonly client: ClientProxy;

  create(dto: CreateEventDto) {
    const source = this.client.send(EventsMessagePatterns.CREATE, dto);

    return firstValueFrom(source);
  }

  findMany(options: FindEventsOptionsDto) {
    const source = this.client.send(EventsMessagePatterns.FIND_MANY, options);

    return firstValueFrom(source);
  }

  findOne(id: string) {
    const source = this.client.send(EventsMessagePatterns.FIND_ONE, id);

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateEventDto) {
    const source = this.client.send(EventsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateEventMessageDto);

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client.send(EventsMessagePatterns.DELETE, id);

    return firstValueFrom(source);
  }
}
