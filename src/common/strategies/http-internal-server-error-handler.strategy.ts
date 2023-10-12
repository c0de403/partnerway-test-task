import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorHandlerInterface } from '../interfaces/internal-server-error-handler.interface';
import { CommonError } from '../errors/common.error';

export class HttpInternalServerErrorHandlerStrategy
  implements InternalServerErrorHandlerInterface
{
  public handle(host: ArgumentsHost): unknown {
    const response = host.switchToHttp().getResponse<Response>();
    const serverError = new CommonError.InternalServerError();

    response.status(serverError.statusCode).json({
      message: serverError.message,
      code: serverError.code,
      statusCode: serverError.statusCode,
    });

    return;
  }
}
