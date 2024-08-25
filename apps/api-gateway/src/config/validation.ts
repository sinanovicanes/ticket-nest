import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsValidPort } from '@app/common/validators';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsValidPort()
  PORT: number;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
