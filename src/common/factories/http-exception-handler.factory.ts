import { ExecutionContextTypeType } from 'src/common/types/execution-context-type.type';
import { HttpExceptionHandlerInterface } from '../interfaces/http-exception-handler.interface';
import { HttpHttpExceptionHandlerStrategy } from '../strategies/http-http-exception-handler.strategy';

export class HttpExceptionHandlerFactory {
  public static getInstance(
    contextType: ExecutionContextTypeType,
  ): HttpExceptionHandlerInterface {
    switch (contextType) {
      case 'http':
        return new HttpHttpExceptionHandlerStrategy();
      default:
        throw new Error(`Unknown Execution Context Type: ${contextType}`);
    }
  }
}
