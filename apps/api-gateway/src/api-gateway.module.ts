import { CacheConfigService } from '@app/common/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { validate } from './config/validation';
import { EventsModule } from './events/events.module';
import { LocationsModule } from './locations/locations.module';
import { StripeModule } from './stripe/stripe.module';
import { TicketSalesModule } from './ticket-sales/ticket-sales.module';
import {
  CacheInterceptorProvider,
  ClassSerializationProvider,
} from '@app/common/providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
    EventsModule,
    TicketSalesModule,
    StripeModule,
    LocationsModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    CacheInterceptorProvider,
    ClassSerializationProvider,
    ApiGatewayService,
  ],
})
export class ApiGatewayModule {}
