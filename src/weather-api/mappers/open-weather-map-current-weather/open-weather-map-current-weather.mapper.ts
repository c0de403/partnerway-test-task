import { OpenWeatherMapCurrentWeatherDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-current-weather.dto';
import { AlertInterface } from 'src/weather-api/interfaces/current-weather/alert.interface';
import { CurrentWeatherInterface } from 'src/weather-api/interfaces/current-weather/current-weather.interface';
import { CurrentInterface } from 'src/weather-api/interfaces/current-weather/current.interface';
import { DailyInterface } from 'src/weather-api/interfaces/current-weather/daily.interface';
import { HourlyInterface } from 'src/weather-api/interfaces/current-weather/hourly.interface';
import { MinutelyInterface } from 'src/weather-api/interfaces/current-weather/minutely.interface';
import { OpenWeatherMapCurrentMapper } from './open-weather-map-current.mapper';
import { OpenWeatherMapMinutelyMapper } from './open-weather-map-minutely.mapper';
import { OpenWeatherMapHourlyMapper } from './open-weather-map-hourly.mapper';
import { OpenWeatherMapDailyMapper } from './open-weather-map-daily.mapper';
import { OpenWeatherMapAlertMapper } from './open-weather-map-alert.mapper';

export class OpenWeatherMapCurrentWeatherMapper
  implements CurrentWeatherInterface
{
  public readonly latitude: number;

  public readonly longitude: number;

  public readonly timezone: string;

  public readonly timezoneOffset: number;

  public readonly current?: CurrentInterface;

  public readonly minutely?: MinutelyInterface[];

  public readonly hourly?: HourlyInterface[];

  public readonly daily?: DailyInterface[];

  public readonly alerts?: AlertInterface[];

  public constructor(weather: OpenWeatherMapCurrentWeatherDto) {
    this.latitude = weather.lat;
    this.longitude = weather.lon;
    this.timezone = weather.timezone;
    this.timezoneOffset = weather.timezone_offset;

    if (weather.current) {
      this.current = new OpenWeatherMapCurrentMapper(weather.current);
    }
    if (weather.minutely) {
      this.minutely = weather.minutely.map((minutely) => {
        return new OpenWeatherMapMinutelyMapper(minutely);
      });
    }
    if (weather.hourly) {
      this.hourly = weather.hourly.map((hourly) => {
        return new OpenWeatherMapHourlyMapper(hourly);
      });
    }
    if (weather.daily) {
      this.daily = weather.daily.map((daily) => {
        return new OpenWeatherMapDailyMapper(daily);
      });
    }
    if (weather.alerts) {
      this.alerts = weather.alerts.map((alert) => {
        return new OpenWeatherMapAlertMapper(alert);
      });
    }
  }
}
