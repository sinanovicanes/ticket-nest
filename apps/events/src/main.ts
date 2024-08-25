import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
import { NatsFactory, NatsServices } from '@app/common/nats';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    EventsModule,
    NatsFactory.createOptions(NatsServices.EVENTS),
  );
  await app.listen();
}
bootstrap();
