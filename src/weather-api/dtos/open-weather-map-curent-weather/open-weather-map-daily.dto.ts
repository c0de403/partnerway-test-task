import { OpenWeatherMapFeelsLikeDto } from './open-weather-map-feels-like.dto';
import { OpenWeatherMapTempDto } from './open-weather-map-temp.dto';
import { OpenWeatherMapWeatherDto } from './open-weather-map-weather.dto';

export class OpenWeatherMapDailyDto {
  public readonly dt: number;

  public readonly sunrise: number;

  public readonly sunset: number;

  public readonly moonrise: number;

  public readonly moonset: number;

  public readonly moon_phase: number;

  public readonly summary: string;

  public readonly temp: OpenWeatherMapTempDto;

  public readonly feels_like: OpenWeatherMapFeelsLikeDto;

  public readonly pressure: number;

  public readonly humidity: number;

  public readonly dew_point: number;

  public readonly wind_speed: number;

  public readonly wind_deg: number;

  public readonly wind_gust?: number;

  public readonly weather: readonly OpenWeatherMapWeatherDto[];

  public readonly clouds: number;

  public readonly pop: number;

  public readonly rain: number;

  public readonly uvi: number;
}
