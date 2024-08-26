import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
import { NatsFactory, NatsServices } from '@app/common/nats';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    EventsModule,
    NatsFactory.createOptions(NatsServices.EVENTS),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen();
}
bootstrap();
