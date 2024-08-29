import {
  CreateEventDto,
  FindEventsOptionsDto,
  UpdateEventDto,
} from '@app/contracts/events';
import { EventsMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(private readonly eventsMicroService: EventsMicroService) {}

  create(dto: CreateEventDto) {
    return this.eventsMicroService.create(dto);
  }

  findMany(options: FindEventsOptionsDto) {
    return this.eventsMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.eventsMicroService.findOne(id);
  }

  update(id: string, dto: UpdateEventDto) {
    return this.eventsMicroService.update(id, dto);
  }

  remove(id: string) {
    return this.eventsMicroService.remove(id);
  }
}
