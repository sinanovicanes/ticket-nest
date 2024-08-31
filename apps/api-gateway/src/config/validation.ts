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
  STRIPE_SECRET: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_WEBHOOK_SECRET: string;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
