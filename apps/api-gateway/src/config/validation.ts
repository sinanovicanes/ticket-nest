import {
  ConfigValidationFactory,
  SharedEnvironmentVariables,
} from '@app/common/config';
import { IsPort } from 'class-validator';

export class EnvironmentVariables extends SharedEnvironmentVariables {
  @IsPort()
  PORT: number;
}

export const validate =
  ConfigValidationFactory.createForClass(EnvironmentVariables);
