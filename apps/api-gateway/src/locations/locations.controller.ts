import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { FindLocationsOptionsDto } from '@app/contracts/locations';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async findAll(@Query() query: FindLocationsOptionsDto) {
    return this.locationsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }
}
