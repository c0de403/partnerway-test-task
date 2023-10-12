import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ExecutionContextTypeType } from '../types/execution-context-type.type';
import { InternalServerErrorHandlerFactory } from '../factories/internal-server-error-handler.factory';
import { InternalServerErrorHandlerStrategyContext } from '../strategies/internal-server-error-handler.strategy-context';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger();

  public catch(exception: Error, host: ArgumentsHost): unknown {
    const contextType = host.getType<ExecutionContextTypeType>();

    try {
      const handlerStrategy =
        InternalServerErrorHandlerFactory.getInstance(contextType);
      const handlerStrategyContext =
        new InternalServerErrorHandlerStrategyContext(handlerStrategy);

      this.logger.error(exception.stack, exception.name);

      return handlerStrategyContext.handle(host);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.stack, error.name);
      } else {
        this.logger.error(error);
      }
    }
  }
}
