import { CreateWeatherDalInterface } from './create-weather-dal/create-weather-dal.interface';
import { FindLatestWeatherByLocationDalInterface } from './find-latest-weather-by-location-dal.interface';
import { WeatherInterface } from './weather/weather.interface';

export interface WeatherRepositoryInterface {
  findLatestByLocation(
    data: FindLatestWeatherByLocationDalInterface,
  ): Promise<WeatherInterface>;

  create(data: CreateWeatherDalInterface): Promise<WeatherInterface>;
}
