import { OpenWeatherMapCurrentDto } from './open-weather-map-current.dto';
import { OpenWeatherMapMinutelyDto } from './open-weather-map-minutely.dto';
import { OpenWeatherMapHourlyDto } from './open-weather-map-hourly.dto';
import { OpenWeatherMapDailyDto } from './open-weather-map-daily.dto';
import { OpenWeatherMapAlertDto } from './open-weather-map-alert.dto';

export class OpenWeatherMapCurrentWeatherDto {
  public readonly lat: number;

  public readonly lon: number;

  public readonly timezone: string;

  public readonly timezone_offset: number;

  public readonly current?: OpenWeatherMapCurrentDto;

  public readonly minutely?: readonly OpenWeatherMapMinutelyDto[];

  public readonly hourly?: readonly OpenWeatherMapHourlyDto[];

  public readonly daily?: readonly OpenWeatherMapDailyDto[];

  public readonly alerts?: readonly OpenWeatherMapAlertDto[];
}
