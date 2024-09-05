import {
  CreateLocationDto,
  FindLocationsOptionsDto,
  LocationMessagePatterns,
  UpdateLocationDto,
  UpdateLocationMessageDto,
} from '@app/contracts/locations';
import { Location } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class LocationsMicroService {
  @Inject(NatsServices.LOCATIONS) private readonly client: ClientProxy;

  create(dto: CreateLocationDto): Promise<Location> {
    const source = this.client
      .send(LocationMessagePatterns.CREATE, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findMany(options: FindLocationsOptionsDto): Promise<Location[]> {
    const source = this.client
      .send(LocationMessagePatterns.FIND_MANY, options)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findOne(id: string): Promise<Location> {
    const source = this.client
      .send(LocationMessagePatterns.FIND_ONE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateLocationDto): Promise<Location> {
    const source = this.client
      .send(LocationMessagePatterns.UPDATE, {
        id,
        dto,
      } as UpdateLocationMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  remove(id: string): Promise<Location> {
    const source = this.client
      .send(LocationMessagePatterns.DELETE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }
}
