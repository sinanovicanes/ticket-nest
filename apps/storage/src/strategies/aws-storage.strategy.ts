import { InjectS3 } from '@app/common/providers';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { StorageStrategy } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsStorageStrategy implements StorageStrategy {
  private readonly bucket = this.configService.get<string>('AWS_BUCKET_NAME');

  constructor(
    @InjectS3() private readonly client: S3,
    private readonly configService: ConfigService,
  ) {}

  private getUrlFromKey(key: string): string {
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  private getKeyFromUrl(url: string): string {
    return url.replace(`https://${this.bucket}.s3.amazonaws.com/`, '');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = file.originalname;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      }),
    );

    return this.getUrlFromKey(key);
  }

  uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const key = this.getKeyFromUrl(fileUrl);

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async deleteFiles(fileUrls: string[]): Promise<void> {
    await this.client.send(
      new DeleteObjectsCommand({
        Bucket: this.bucket,
        Delete: {
          Objects: fileUrls.map((fileUrl) => ({
            Key: this.getKeyFromUrl(fileUrl),
          })),
        },
      }),
    );
  }
}
