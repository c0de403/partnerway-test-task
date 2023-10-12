import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class HostValidator implements ValidatorConstraintInterface {
  public validate(value: unknown): boolean {
    /**
     * Hostname RegExp according to RFC-1123.
     */
    const regex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;

    return typeof value === 'string' && regex.test(value);
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} must be a valid HOST`;
  }
}
