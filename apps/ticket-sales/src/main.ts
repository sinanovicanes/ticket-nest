import { NestFactory } from '@nestjs/core';
import { TicketSalesModule } from './ticket-sales.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketSalesModule);
  await app.listen(3000);
}
bootstrap();
