import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsValidPort } from '@app/common/validators';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsValidPort()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  GOOGLE_AUTH_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_AUTH_CLIENT_SECRET: string;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
