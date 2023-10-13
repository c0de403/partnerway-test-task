import { OpenWeatherMapWeatherDto } from './open-weather-map-weather.dto';

export class OpenWeatherMapHourlyDto {
  public readonly dt: number;

  public readonly temp: number;

  public readonly feels_like: number;

  public readonly pressure: number;

  public readonly humidity: number;

  public readonly dew_point: number;

  public readonly uvi: number;

  public readonly clouds: number;

  public readonly visibility: number;

  public readonly wind_speed: number;

  public readonly wind_deg: number;

  public readonly wind_gust?: number;

  public readonly pop: number;

  public readonly weather: readonly OpenWeatherMapWeatherDto[];
}
