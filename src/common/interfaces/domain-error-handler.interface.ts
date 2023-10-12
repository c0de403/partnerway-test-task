import { ArgumentsHost } from '@nestjs/common';
import { DomainError } from '../errors/domain.error';

export interface DomainErrorHandlerInterface {
  handle(exception: DomainError, host: ArgumentsHost): unknown;
}
