import { ArgumentsHost } from '@nestjs/common';

export interface InternalServerErrorHandlerInterface {
  handle(host: ArgumentsHost): unknown;
}
