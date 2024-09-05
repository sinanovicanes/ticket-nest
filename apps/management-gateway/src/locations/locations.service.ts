import {
  CreateLocationDto,
  FindLocationsOptionsDto,
  UpdateLocationDto,
} from '@app/contracts/locations';
import { LocationsMicroService } from '@app/microservices/locations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsMicroService: LocationsMicroService) {}

  create(dto: CreateLocationDto) {
    return this.locationsMicroService.create(dto);
  }

  findAll(options: FindLocationsOptionsDto) {
    return this.locationsMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.locationsMicroService.findOne(id);
  }

  update(id: string, dto: UpdateLocationDto) {
    return this.locationsMicroService.update(id, dto);
  }

  remove(id: string) {
    return this.locationsMicroService.remove(id);
  }
}
