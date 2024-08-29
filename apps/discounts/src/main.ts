import { NestFactory } from '@nestjs/core';
import { DiscountsModule } from './discounts.module';
import { NatsFactory, NatsServices } from '@app/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    DiscountsModule,
    NatsFactory.createOptions(NatsServices.DISCOUNTS),
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
