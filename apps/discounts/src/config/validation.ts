import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DISCOUNT_CODE_ENCRYPTION_SECRET: string;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
