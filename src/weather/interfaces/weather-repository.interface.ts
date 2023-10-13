import { CreateWeatherDalInterface } from './create-weather-dal/create-weather-dal.interface';
import { WeatherInterface } from './weather/weather.interface';

export interface WeatherRepositoryInterface {
  create(data: CreateWeatherDalInterface): Promise<WeatherInterface>;
}
