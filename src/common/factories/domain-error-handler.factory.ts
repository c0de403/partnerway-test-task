import { ExecutionContextTypeType } from 'src/common/types/execution-context-type.type';
import { DomainErrorHandlerInterface } from '../interfaces/domain-error-handler.interface';
import { HttpDomainErrorHandlerStrategy } from '../strategies/http-domain-error-handler.strategy';

export class DomainErrorHandlerFactory {
  public static getInstance(
    contextType: ExecutionContextTypeType,
  ): DomainErrorHandlerInterface {
    switch (contextType) {
      case 'http':
        return new HttpDomainErrorHandlerStrategy();
      default:
        throw new Error(`Unknown Execution Context Type: ${contextType}`);
    }
  }
}
