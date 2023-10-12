import { ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpExceptionHandlerInterface } from '../interfaces/http-exception-handler.interface';

export class HttpExceptionHandlerStrategyContext {
  private strategy: HttpExceptionHandlerInterface;

  public constructor(strategy: HttpExceptionHandlerInterface) {
    this.strategy = strategy;
  }

  public setNewStrategy(newStrategy: HttpExceptionHandlerInterface): void {
    this.strategy = newStrategy;
  }

  public handle(exception: HttpException, host: ArgumentsHost): unknown {
    return this.strategy.handle(exception, host);
  }
}
