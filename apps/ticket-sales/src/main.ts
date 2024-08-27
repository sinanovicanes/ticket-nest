import { NestFactory } from '@nestjs/core';
import { TicketSalesModule } from './ticket-sales.module';
import { NatsFactory, NatsServices } from '@app/common/nats';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    TicketSalesModule,
    NatsFactory.createOptions(NatsServices.TICKET_SALES),
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
