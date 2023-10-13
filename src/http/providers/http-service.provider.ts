import { Provider } from '@nestjs/common';
import { HTTP_CONSTANTS } from '../constants/http.constants';
import { NodeFetchHttpService } from '../services/node-fetch-http.service';

export const HttpServiceProvider: Provider = {
  provide: HTTP_CONSTANTS.APPLICATION.SERVICE_TOKEN,
  useClass: NodeFetchHttpService,
};
