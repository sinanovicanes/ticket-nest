import { FindLocationsOptionsDto } from '@app/contracts/locations';
import { LocationsMicroService } from '@app/microservices/locations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsMicroService: LocationsMicroService) {}

  findMany(options: FindLocationsOptionsDto) {
    return this.locationsMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.locationsMicroService.findOne(id);
  }
}
