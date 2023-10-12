import { ArgumentsHost } from '@nestjs/common';
import { InternalServerErrorHandlerInterface } from '../interfaces/internal-server-error-handler.interface';

export class InternalServerErrorHandlerStrategyContext {
  private strategy: InternalServerErrorHandlerInterface;

  public constructor(strategy: InternalServerErrorHandlerInterface) {
    this.strategy = strategy;
  }

  public setNewStrategy(
    newStrategy: InternalServerErrorHandlerInterface,
  ): void {
    this.strategy = newStrategy;
  }

  public handle(host: ArgumentsHost): unknown {
    return this.strategy.handle(host);
  }
}
