import { Provider } from '@nestjs/common';
import { WEATHER_API_CONSTANTS } from '../constants/weather-api.constants';
import { OpenWeatherMapApiToWeatherApiServiceAdapter } from '../adapters/open-weather-map-api-to-weather-api-service.adapter';

export const WeatherApiServiceProvider: Provider = {
  provide: WEATHER_API_CONSTANTS.APPLICATION.SERVICE_TOKEN,
  useClass: OpenWeatherMapApiToWeatherApiServiceAdapter,
};
