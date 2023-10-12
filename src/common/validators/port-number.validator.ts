import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isPort,
} from 'class-validator';

@ValidatorConstraint()
export class PortNumberValidator implements ValidatorConstraintInterface {
  public validate(value: unknown): boolean {
    return typeof value === 'number' && isPort(value.toString());
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} must be a valid PORT number`;
  }
}
