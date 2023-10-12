import { ExecutionContextTypeType } from 'src/common/types/execution-context-type.type';
import { InternalServerErrorHandlerInterface } from '../interfaces/internal-server-error-handler.interface';
import { HttpInternalServerErrorHandlerStrategy } from '../strategies/http-internal-server-error-handler.strategy';

export class InternalServerErrorHandlerFactory {
  public static getInstance(
    contextType: ExecutionContextTypeType,
  ): InternalServerErrorHandlerInterface {
    switch (contextType) {
      case 'http':
        return new HttpInternalServerErrorHandlerStrategy();
      default:
        throw new Error(`Unknown Execution Context Type: ${contextType}`);
    }
  }
}
