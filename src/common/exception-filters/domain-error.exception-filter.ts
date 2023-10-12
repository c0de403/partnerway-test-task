import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { DomainError } from '../errors/domain.error';
import { ExecutionContextTypeType } from '../types/execution-context-type.type';
import { DomainErrorHandlerFactory } from '../factories/domain-error-handler.factory';
import { DomainErrorHandlerStrategyContext } from '../strategies/domain-error-handler.strategy-context';

@Catch(DomainError)
export class DomainErrorExceptionFilter
  implements ExceptionFilter<DomainError>
{
  private readonly logger = new Logger();

  public catch(exception: DomainError, host: ArgumentsHost): unknown {
    const contextType = host.getType<ExecutionContextTypeType>();

    try {
      const handlerStrategy =
        DomainErrorHandlerFactory.getInstance(contextType);
      const handlerStrategyContext = new DomainErrorHandlerStrategyContext(
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
