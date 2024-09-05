import { NatsModule, NatsServices } from '@app/microservices';
import { Module } from '@nestjs/common';
import { EmailMicroService } from './email.micro.service';

@Module({
  imports: [NatsModule.register(NatsServices.EMAIL)],
  exports: [NatsModule, EmailMicroService],
  providers: [EmailMicroService],
})
export class EmailMicroServiceModule {}
