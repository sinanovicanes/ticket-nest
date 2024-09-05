import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { validate } from './config/validation';
import { EventsModule } from './events/events.module';
import { LocationsModule } from './locations/locations.module';
import { ManagementGatewayController } from './management-gateway.controller';
import { ManagementGatewayService } from './management-gateway.service';
import { PaymentsModule } from './payments/payments.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    DatabaseModule,
    LocationsModule,
    EventsModule,
    TicketSalesModule,
    TicketsModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [ManagementGatewayController],
  providers: [ManagementGatewayService],
})
export class ManagementGatewayModule {}
