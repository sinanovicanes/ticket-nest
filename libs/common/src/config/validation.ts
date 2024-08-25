import { ClassConstructor, plainToInstance } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  PROVISION = 'provision',
}

export class SharedEnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.DEVELOPMENT;

  @IsString()
  DATABASE_URL: string;
}

export class ConfigValidationFactory {
  static createForClass<T extends Object>(cls: ClassConstructor<T>) {
    return (config: Record<string, unknown>) => {
      const validatedConfig = plainToInstance(cls, config, {
        enableImplicitConversion: true,
      });

      const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      return validatedConfig;
    };
  }
}
