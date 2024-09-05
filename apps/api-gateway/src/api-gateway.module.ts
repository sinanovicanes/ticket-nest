import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { StripeModule } from './stripe/stripe.module';
import { validate } from './config/validation';
import { EventsModule } from './events/events.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    EventsModule,
    TicketSalesModule,
    StripeModule,
    LocationsModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
