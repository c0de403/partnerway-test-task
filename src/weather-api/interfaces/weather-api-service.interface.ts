import { CurrentWeatherInterface } from './current-weather/current-weather.interface';
import { RequestCurrentWeatherInterface } from './request-current-weather.interface';

export interface WeatherApiServiceInterface {
  requestCurrentWeather(
    data: RequestCurrentWeatherInterface,
  ): Promise<CurrentWeatherInterface>;
}
