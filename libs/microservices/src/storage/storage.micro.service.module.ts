import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { StorageMicroService } from './storage.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.TICKETS)],
  exports: [NatsModule, StorageMicroService],
  providers: [StorageMicroService],
})
export class StorageMicroServiceModule {}
