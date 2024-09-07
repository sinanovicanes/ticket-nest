import { NatsServices } from '@app/microservices';
import {
  CreateEventDto,
  EventsEventPatterns,
  EventsMessagePatterns,
  FindEventsOptionsDto,
  UpdateEventDto,
  UpdateEventMessageDto,
  UploadEventImageDto,
} from '@app/contracts/events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';

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

  uploadImage(eventId: string, file: Express.Multer.File): Promise<string> {
    const source = this.client
      .send(EventsMessagePatterns.UPLOAD_IMAGE, {
        eventId,
        file,
      } as UploadEventImageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  deleteImage(url: string) {
    this.client.emit(EventsEventPatterns.DELETE_IMAGE, url);
  }
}
