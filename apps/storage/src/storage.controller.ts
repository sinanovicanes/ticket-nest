import {
  StorageEventPatterns,
  StorageMessagePatterns,
} from '@app/contracts/storage';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { StorageService } from './storage.service';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern(StorageMessagePatterns.UPLOAD)
  uploadFile(file: Express.Multer.File) {
    return this.storageService.uploadFile(file);
  }

  @MessagePattern(StorageMessagePatterns.UPLOAD_MANY)
  uploadFiles(files: Express.Multer.File[]) {
    return this.storageService.uploadFiles(files);
  }

  @EventPattern(StorageEventPatterns.DELETE)
  deleteFile(fileUrl: string) {
    return this.storageService.deleteFile(fileUrl);
  }

  @EventPattern(StorageEventPatterns.DELETE_MANY)
  deleteFiles(fileUrls: string[]) {
    return this.storageService.deleteFiles(fileUrls);
  }
}
