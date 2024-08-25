import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isPort,
} from 'class-validator';

@ValidatorConstraint()
export class IsValidPortConstraint implements ValidatorConstraintInterface {
  validate(port: unknown, args: ValidationArguments) {
    switch (typeof port) {
      case 'string':
        return isPort(port);
      case 'number':
        return isPort(port.toString());
      default:
        return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Port must be a valid number or string representation of a number';
  }
}

export function IsValidPort(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPortConstraint,
    });
  };
}
