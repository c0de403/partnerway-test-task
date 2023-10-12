import { HttpStatus } from '@nestjs/common';
import { DomainError } from 'src/common/errors/domain.error';

export class CommonError {
  public static Forbidden = class extends DomainError {
    public constructor() {
      const name = 'ForbiddenError';
      const message = 'Forbidden';
      const statusCode = HttpStatus.FORBIDDEN;

      super(name, message, statusCode);
    }
  };

  public static BadRequest = class extends DomainError {
    public constructor(customMessage?: string) {
      const name = 'BadRequestError';
      const message = customMessage || 'Bad Request';
      const statusCode = HttpStatus.BAD_REQUEST;

      super(name, message, statusCode);
    }
  };

  public static InternalServerError = class extends DomainError {
    public constructor() {
      const name = 'InternalServerErrorError';
      const message =
        'Oops! Something went wrong. The server encountered an error and could not complete your request';
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      super(name, message, statusCode);
    }
  };
}
