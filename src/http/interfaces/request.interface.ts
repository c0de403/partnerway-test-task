import { HttpMethodEnum } from '../enums/http-method.enum';
import { HeadersInterface } from './headers.interface';

export interface RequestInterface {
  readonly url: string;

  readonly method: HttpMethodEnum;

  readonly headers?: HeadersInterface;
}
