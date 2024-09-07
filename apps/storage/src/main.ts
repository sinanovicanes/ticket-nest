import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { NatsFactory, NatsServices } from '@app/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    StorageModule,
    NatsFactory.createOptions(NatsServices.STORAGE),
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
