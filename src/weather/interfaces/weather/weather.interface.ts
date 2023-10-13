import { AlertInterface } from './alert.interface';
import { CurrentInterface } from './current.interface';
import { DailyInterface } from './daily.interface';
import { HourlyInterface } from './hourly.interface';
import { MinutelyInterface } from './minutely.interface';

export interface WeatherInterface {
  readonly id: string;

  readonly latitude: number;

  readonly longitude: number;

  readonly timezone: string;

  readonly timezoneOffset: number;

  readonly current?: CurrentInterface;

  readonly minutely?: readonly MinutelyInterface[];

  readonly hourly?: readonly HourlyInterface[];

  readonly daily?: readonly DailyInterface[];

  readonly alerts?: readonly AlertInterface[];

  readonly createdAt: Date;
}
