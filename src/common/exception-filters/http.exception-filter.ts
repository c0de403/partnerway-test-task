import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ExecutionContextTypeType } from '../types/execution-context-type.type';
import { HttpExceptionHandlerFactory } from '../factories/http-exception-handler.factory';
import { HttpExceptionHandlerStrategyContext } from '../strategies/http-exception-handler.strategy-context';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger();

  public catch(exception: HttpException, host: ArgumentsHost): unknown {
    const contextType = host.getType<ExecutionContextTypeType>();

    try {
      const handlerStrategy =
        HttpExceptionHandlerFactory.getInstance(contextType);
      const handlerStrategyContext = new HttpExceptionHandlerStrategyContext(
        handlerStrategy,
      );

      return handlerStrategyContext.handle(exception, host);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.stack, error.name);
      } else {
        this.logger.error(error);
      }
    }
  }
}
