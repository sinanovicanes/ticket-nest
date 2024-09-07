import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsInt()
  @IsPositive()
  MAX_FILE_SIZE: number = 1024 * 1024 * 5; // 5MB

  @IsString()
  @IsNotEmpty()
  AWS_BUCKET_NAME: string;

  @IsString()
  @IsNotEmpty()
  AWS_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
