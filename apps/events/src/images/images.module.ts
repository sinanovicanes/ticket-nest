import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { StorageMicroServiceModule } from '@app/microservices';

@Module({
  imports: [StorageMicroServiceModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
