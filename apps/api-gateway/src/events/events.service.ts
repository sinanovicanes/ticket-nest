import { NatsServices } from '@app/common/nats';
import {
  CreateEventDto,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventDto,
} from '@app/contracts/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  @Inject(NatsServices.EVENTS) private readonly client: ClientProxy;

  create(createEventDto: CreateEventDto) {
    return this.client.send(EventsMessagePatterns.CREATE, createEventDto);
  }

  findAll(options: FindEventsOptionsDto) {
    return this.client.send(EventsMessagePatterns.FIND, options);
  }

  findOne(id: number) {
    return this.client.send(EventsMessagePatterns.FIND_ONE, id);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.client.send(EventsMessagePatterns.UPDATE, {
      id,
      ...updateEventDto,
    });
  }

  remove(id: number) {
    return this.client.send(EventsMessagePatterns.DELETE, id);
  }
}
