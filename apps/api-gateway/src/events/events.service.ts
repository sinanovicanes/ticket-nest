import { NatsServices } from '@app/common/nats';
import {
  CreateEventDto,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventDto,
  UpdateEventMessageDto,
} from '@app/contracts/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  @Inject(NatsServices.EVENTS) private readonly client: ClientProxy;

  create(dto: CreateEventDto) {
    return this.client.send(EventsMessagePatterns.CREATE, dto);
  }

  findMany(options: FindEventsOptionsDto) {
    return this.client.send(EventsMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string) {
    return this.client.send(EventsMessagePatterns.FIND_ONE, id);
  }

  update(id: string, dto: UpdateEventDto) {
    return this.client.send(EventsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateEventMessageDto);
  }

  remove(id: string) {
    return this.client.send(EventsMessagePatterns.DELETE, id);
  }
}
