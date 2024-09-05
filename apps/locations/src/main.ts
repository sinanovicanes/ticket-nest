import { NestFactory } from '@nestjs/core';
import { LocationsModule } from './locations.module';
import { NatsFactory, NatsServices } from '@app/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    LocationsModule,
    NatsFactory.createOptions(NatsServices.LOCATIONS),
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
