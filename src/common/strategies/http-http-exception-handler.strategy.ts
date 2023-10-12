import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionHandlerInterface } from '../interfaces/http-exception-handler.interface';

export class HttpHttpExceptionHandlerStrategy
  implements HttpExceptionHandlerInterface
{
  public handle(exception: HttpException, host: ArgumentsHost): unknown {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.getStatus()).json(exception.getResponse());

    return;
  }
}
