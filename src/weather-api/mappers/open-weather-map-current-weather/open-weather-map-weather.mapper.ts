import { OpenWeatherMapWeatherDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-weather.dto';
import { WeatherConditionInterface } from 'src/weather-api/interfaces/current-weather/weather-condition.interface';

export class OpenWeatherMapWeatherMapper implements WeatherConditionInterface {
  public readonly externalId: number;

  public readonly main: string;

  public readonly description: string;

  public readonly icon: string;

  public constructor(weather: OpenWeatherMapWeatherDto) {
    this.externalId = weather.id;
    this.main = weather.main;
    this.description = weather.description;
    this.icon = weather.icon;
  }
}
