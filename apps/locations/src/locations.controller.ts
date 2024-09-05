import { Controller } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateLocationDto,
  LocationMessagePatterns,
  UpdateLocationDto,
  UpdateLocationMessageDto,
} from '@app/contracts/locations';

@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @MessagePattern(LocationMessagePatterns.CREATE)
  createOne(@Payload() dto: CreateLocationDto) {
    return this.locationsService.createOne(dto);
  }

  @MessagePattern(LocationMessagePatterns.FIND_MANY)
  findMany() {
    return this.locationsService.findMany();
  }

  @MessagePattern(LocationMessagePatterns.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.locationsService.findOne(id);
  }

  @MessagePattern(LocationMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateLocationMessageDto) {
    return this.locationsService.updateOne(id, dto);
  }

  @MessagePattern(LocationMessagePatterns.DELETE)
  deleteOne(@Payload() id: string) {
    return this.locationsService.deleteOne(id);
  }
}
