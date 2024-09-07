import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { S3Provider } from '@app/common/providers';
import { AwsStorageStrategy } from './strategies/aws-storage.strategy';

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [S3Provider, AwsStorageStrategy, StorageService],
})
export class StorageModule {}
