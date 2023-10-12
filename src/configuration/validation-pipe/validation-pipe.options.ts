import { ValidationPipeOptions as NestValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CommonError } from 'src/common/errors/common.error';
import { ValidationErrorUtil } from '../../common/utils/validation-error.util';
import { DomainError } from 'src/common/errors/domain.error';

export class ValidationPipeOptions implements NestValidationPipeOptions {
  public static transform = true;

  public static transformOptions = {
    enableImplicitConversion: true,
  };

  public static exceptionFactory(
    validationErrors: ValidationError[],
  ): DomainError {
    const errors = ValidationErrorUtil.flatten(validationErrors);

    return new CommonError.BadRequest(errors);
  }
}
