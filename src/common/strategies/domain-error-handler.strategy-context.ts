import { ArgumentsHost } from '@nestjs/common';
import { DomainErrorHandlerInterface } from '../interfaces/domain-error-handler.interface';
import { DomainError } from '../errors/domain.error';

export class DomainErrorHandlerStrategyContext {
  private strategy: DomainErrorHandlerInterface;

  public constructor(strategy: DomainErrorHandlerInterface) {
    this.strategy = strategy;
  }

  public setNewStrategy(newStrategy: DomainErrorHandlerInterface): void {
    this.strategy = newStrategy;
  }

  public handle(exception: DomainError, host: ArgumentsHost): unknown {
    return this.strategy.handle(exception, host);
  }
}
