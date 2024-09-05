import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsMicroServiceModule } from '@app/microservices/locations';

@Module({
  imports: [LocationsMicroServiceModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
