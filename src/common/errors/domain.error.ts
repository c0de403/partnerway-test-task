import { HttpStatus } from '@nestjs/common';

export abstract class DomainError extends Error {
  /**
   * The `name` property is used to specify the type of the error, making it easier to identify,
   * especially when debugging.
   *
   * @example
   * this.name = 'UnauthorizedError';
   * this.name = 'ForbiddenError';
   * this.name = 'UserNotFoundError';
   * this.name = 'WrongEmailOrPasswordError';
   * this.name = 'UserRoleCombinationNotAllowedError';
   */
  public readonly name: string;

  /**
   * A human-readable message that describes the error.
   *
   * @example
   * this.name = 'Unauthorized';
   * this.name = 'Wrong email or password';
   * this.name = 'The user has not been found';
   * this.name = 'Invalid Access JSON Web Token';
   */
  public readonly message: string;

  /**
   * An HTTP string code associated with the error and its status code.
   *
   * @example
   * this.name = 'FORBIDDEN';
   * this.name = 'UNAUTHORIZED';
   * this.name = 'NOT_FOUND';
   */
  public readonly code: string;

  /**
   * An HTTP status code associated with the error.
   */
  public readonly statusCode: HttpStatus;

  public readonly domain = true;

  public constructor(name: string, message: string, statusCode: HttpStatus) {
    super();

    this.name = name;
    this.message = message;
    this.code = HttpStatus[statusCode];
    this.statusCode = statusCode;
  }
}
