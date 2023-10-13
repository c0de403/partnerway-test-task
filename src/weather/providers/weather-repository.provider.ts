import { Provider } from '@nestjs/common';
import { WEATHER_CONSTANTS } from '../constants/weather.constants';
import { TypeormWeatherRepository } from '../repositories/typeorm-weather.repository';

export const WeatherRepositoryProvider: Provider = {
  provide: WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
  useClass: TypeormWeatherRepository,
};
