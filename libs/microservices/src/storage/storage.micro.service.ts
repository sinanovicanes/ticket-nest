import {
  StorageEventPatterns,
  StorageMessagePatterns,
} from '@app/contracts/storage';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class StorageMicroService {
  @Inject(NatsServices.STORAGE) private readonly client: ClientProxy;

  upload(file: Express.Multer.File): Promise<string> {
    const source = this.client
      .send(StorageMessagePatterns.UPLOAD, file)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  uploadMany(files: Express.Multer.File[]): Promise<string[]> {
    const source = this.client
      .send(StorageMessagePatterns.UPLOAD_MANY, files)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  delete(fileUrl: string) {
    this.client.emit(StorageEventPatterns.DELETE, fileUrl);
  }

  deleteMany(fileUrls: string[]) {
    this.client.emit(StorageEventPatterns.DELETE_MANY, fileUrls);
  }
}
