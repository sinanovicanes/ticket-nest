import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { NatsFactory, NatsServices } from '@app/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    PaymentsModule,
    NatsFactory.createOptions(NatsServices.PAYMENTS),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen();
}
bootstrap();
