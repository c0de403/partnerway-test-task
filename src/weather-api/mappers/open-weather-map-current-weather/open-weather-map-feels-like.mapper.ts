import { OpenWeatherMapFeelsLikeDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-feels-like.dto';
import { FeelsLikeInterface } from 'src/weather-api/interfaces/current-weather/feels-like.interface';

export class OpenWeatherMapFeelsLikeMapper implements FeelsLikeInterface {
  public readonly day: number;

  public readonly night: number;

  public readonly evening: number;

  public readonly morning: number;

  public constructor(feelsLike: OpenWeatherMapFeelsLikeDto) {
    this.day = feelsLike.day;
    this.night = feelsLike.night;
    this.evening = feelsLike.eve;
    this.morning = feelsLike.morn;
  }
}
