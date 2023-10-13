import { OpenWeatherMapMinutelyDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-minutely.dto';
import { MinutelyInterface } from 'src/weather-api/interfaces/current-weather/minutely.interface';

export class OpenWeatherMapMinutelyMapper implements MinutelyInterface {
  public readonly timestamp: number;

  public readonly precipitation: number;

  public constructor(minutely: OpenWeatherMapMinutelyDto) {
    this.timestamp = minutely.dt;
    this.precipitation = minutely.precipitation;
  }
}
