import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { StorageMicroServiceModule } from '@app/microservices';

@Module({
  imports: [StorageMicroServiceModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
