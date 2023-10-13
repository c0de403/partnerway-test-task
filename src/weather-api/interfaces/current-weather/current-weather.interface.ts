import { AlertInterface } from './alert.interface';
import { CurrentInterface } from './current.interface';
import { DailyInterface } from './daily.interface';
import { HourlyInterface } from './hourly.interface';
import { MinutelyInterface } from './minutely.interface';

export interface CurrentWeatherInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly timezone: string;

  readonly timezoneOffset: number;

  readonly current?: CurrentInterface;

  readonly minutely?: MinutelyInterface[];

  readonly hourly?: HourlyInterface[];

  readonly daily?: DailyInterface[];

  readonly alerts?: AlertInterface[];
}
