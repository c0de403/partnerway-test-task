import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { HttpServiceInterface } from '../interfaces/http-service.interface';
import { RequestInterface } from '../interfaces/request.interface';

@Injectable()
export class NodeFetchHttpService implements HttpServiceInterface {
  public async requestJsonBody<T>(request: RequestInterface): Promise<T> {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
    });

    const body = (await response.json()) as T;

    return body;
  }
}
