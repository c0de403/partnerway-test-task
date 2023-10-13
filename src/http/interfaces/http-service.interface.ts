import { RequestInterface } from './request.interface';

export interface HttpServiceInterface {
  requestJsonBody<T>(request: RequestInterface): Promise<T>;
}
