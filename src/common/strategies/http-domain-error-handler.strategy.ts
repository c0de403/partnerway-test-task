import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { DomainErrorHandlerInterface } from '../interfaces/domain-error-handler.interface';
import { DomainError } from '../errors/domain.error';

export class HttpDomainErrorHandlerStrategy
  implements DomainErrorHandlerInterface
{
  public handle(exception: DomainError, host: ArgumentsHost): unknown {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.statusCode).json({
      message: exception.message,
      code: exception.code,
      statusCode: exception.statusCode,
    });

    return;
  }
}
