import { BadRequestException, Injectable } from '@nestjs/common';
import { AwsStorageStrategy } from './strategies/aws-storage.strategy';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StorageService {
  constructor(
    private readonly s3Storage: AwsStorageStrategy,
    private readonly configService: ConfigService,
  ) {}

  private validateFileSize(file: Express.Multer.File) {
    const maxSize = this.configService.get<number>('MAX_FILE_SIZE');

    if (file.size > maxSize) {
      throw new RpcException(
        new BadRequestException(
          `File size is too large. Max file size is ${maxSize} bytes`,
        ),
      );
    }
  }

  uploadFile(file: Express.Multer.File) {
    this.validateFileSize(file);
    return this.s3Storage.uploadFile(file);
  }

  uploadFiles(files: Express.Multer.File[]) {
    files.forEach((file) => this.validateFileSize(file));
    return this.s3Storage.uploadFiles(files);
  }

  deleteFile(fileUrl: string) {
    return this.s3Storage.deleteFile(fileUrl);
  }

  deleteFiles(fileUrls: string[]) {
    return this.s3Storage.deleteFiles(fileUrls);
  }
}
