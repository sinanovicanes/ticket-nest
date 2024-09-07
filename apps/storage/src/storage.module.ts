import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { S3Provider } from '@app/common/providers';
import { AwsStorageStrategy } from './strategies/aws-storage.strategy';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '/apps/storage/.env'],
      validate,
    }),
  ],
  controllers: [StorageController],
  providers: [S3Provider, AwsStorageStrategy, StorageService],
})
export class StorageModule {}
