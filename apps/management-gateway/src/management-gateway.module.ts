import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { ManagementGatewayController } from './management-gateway.controller';
import { ManagementGatewayService } from './management-gateway.service';
import { LocationsModule } from './locations/locations.module';
import { EventsModule } from './events/events.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';

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
    PaymentsModule,
    AuthModule,
  ],
  controllers: [ManagementGatewayController],
  providers: [
    ManagementGatewayService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class ManagementGatewayModule {}
