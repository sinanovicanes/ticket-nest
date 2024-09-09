import {
  AddEventImageDto,
  CreateEventDto,
  EventsEventPatterns,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventDto,
  UpdateEventMessageDto,
} from '@app/contracts/events';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class EventsMicroService {
  @Inject(NatsServices.EVENTS) private readonly client: ClientProxy;

  create(dto: CreateEventDto) {
    const source = this.client
      .send(EventsMessagePatterns.CREATE, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findMany(options: FindEventsOptionsDto) {
    const source = this.client
      .send(EventsMessagePatterns.FIND_MANY, options)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findOne(id: string) {
    const source = this.client
      .send(EventsMessagePatterns.FIND_ONE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateEventDto) {
    const source = this.client
      .send(EventsMessagePatterns.UPDATE, {
        id,
        dto,
      } as UpdateEventMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client
      .send(EventsMessagePatterns.DELETE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  addImage(eventId: string, url: string) {
    this.client.emit(EventsEventPatterns.ADD_IMAGE, {
      eventId,
      url,
    } as AddEventImageDto);
  }

  removeImage(imageId: string) {
    this.client.emit(EventsEventPatterns.REMOVE_IMAGE, imageId);
  }

  removeImageByURL(url: string) {
    this.client.emit(EventsEventPatterns.REMOVE_IMAGE_BY_URL, url);
  }
}
