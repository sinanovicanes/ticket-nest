import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { CheckoutModule } from './checkout/checkout.module';
import { validate } from './config/validation';
import { EventsModule } from './events/events.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    EventsModule,
    TicketSalesModule,
    CheckoutModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
