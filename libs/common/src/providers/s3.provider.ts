import { S3 } from '@aws-sdk/client-s3';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const S3_TOKEN = 'S3_TOKEN';
export const InjectS3 = () => Inject(S3_TOKEN);

export const S3Provider: Provider = {
  provide: S3_TOKEN,
  inject: [ConfigService],
  useExisting: ConfigService,
  useFactory: (configService: ConfigService) => {
    return new S3({
      region: configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  },
};
