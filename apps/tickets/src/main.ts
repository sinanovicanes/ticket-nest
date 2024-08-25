import { NestFactory } from '@nestjs/core';
import { TicketsModule } from './tickets.module';
import { NatsFactory, NatsServices } from '@app/common/nats';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    TicketsModule,
    NatsFactory.createOptions(NatsServices.TICKETS),
  );
  await app.listen();
}
bootstrap();
