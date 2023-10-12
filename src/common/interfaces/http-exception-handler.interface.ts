import { ArgumentsHost, HttpException } from '@nestjs/common';

export interface HttpExceptionHandlerInterface {
  handle(exception: HttpException, host: ArgumentsHost): unknown;
}
