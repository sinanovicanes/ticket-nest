import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  STRIPE_SECRET: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_WEBHOOK_SECRET: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_CURRENCY: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_SUCCESS_URL: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_CANCEL_URL: string;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
