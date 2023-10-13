import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherResponse } from '../responses/weather/weather.response';
import { InterceptedWeatherResponse } from '../responses/intercepted-weather.response';

@Injectable()
export class WeatherResponseInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((response: unknown): unknown | InterceptedWeatherResponse => {
        if (response instanceof WeatherResponse) {
          return new InterceptedWeatherResponse(response);
        }

        return response;
      }),
    );
  }
}
