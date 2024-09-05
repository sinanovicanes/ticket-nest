import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { ManagementGatewayController } from './management-gateway.controller';
import { ManagementGatewayService } from './management-gateway.service';
import { LocationsModule } from './locations/locations.module';
import { EventsModule } from './events/events.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    LocationsModule,
    EventsModule,
    TicketSalesModule,
    TicketsModule,
  ],
  controllers: [ManagementGatewayController],
  providers: [ManagementGatewayService],
})
export class ManagementGatewayModule {}
