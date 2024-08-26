import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEventDto,
  EventsMessagePatterns,
  FindEventsOptionsDto,
} from '@app/contracts/events';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(EventsMessagePatterns.CREATE)
  create(@Payload() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @MessagePattern(EventsMessagePatterns.FIND)
  findMany(@Payload() options: FindEventsOptionsDto) {
    return this.eventsService.findMany(options);
  }

  @MessagePattern(EventsMessagePatterns.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.eventsService.findOne(id);
  }

  @MessagePattern(EventsMessagePatterns.UPDATE)
  update(@Payload() dto: CreateEventDto) {
    return this.eventsService.update(dto);
  }

  @MessagePattern(EventsMessagePatterns.DELETE)
  delete(@Payload() id: number) {
    return this.eventsService.delete(id);
  }
}
