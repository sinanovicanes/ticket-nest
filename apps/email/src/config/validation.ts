import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsValidPort } from '@app/common/validators';
import { IsString } from 'class-validator';

class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsString()
  EMAIL_HOST: string;

  @IsValidPort()
  EMAIL_PORT: number = 587;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsString()
  EMAIL_FROM: string = 'no-reply@ticket_nest.com';
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
