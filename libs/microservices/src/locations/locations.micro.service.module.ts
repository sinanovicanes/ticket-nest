import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { LocationsMicroService } from './locations.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.LOCATIONS)],
  exports: [NatsModule, LocationsMicroService],
  providers: [LocationsMicroService],
})
export class LocationsMicroServiceModule {}
