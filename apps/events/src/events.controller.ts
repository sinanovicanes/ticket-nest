import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEventDto,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventMessageDto,
} from '@app/contracts/events';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(EventsMessagePatterns.CREATE)
  create(@Payload() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @MessagePattern(EventsMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindEventsOptionsDto) {
    return this.eventsService.findMany(options);
  }

  @MessagePattern(EventsMessagePatterns.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.eventsService.findOne(id);
  }

  @MessagePattern(EventsMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateEventMessageDto) {
    return this.eventsService.updateOne(id, dto);
  }

  @MessagePattern(EventsMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.eventsService.delete(id);
  }
}
