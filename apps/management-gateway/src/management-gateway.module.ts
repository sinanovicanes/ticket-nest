import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { ManagementGatewayController } from './management-gateway.controller';
import { ManagementGatewayService } from './management-gateway.service';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api-gateway/.env'],
      validate,
    }),
    LocationsModule,
  ],
  controllers: [ManagementGatewayController],
  providers: [ManagementGatewayService],
})
export class ManagementGatewayModule {}
