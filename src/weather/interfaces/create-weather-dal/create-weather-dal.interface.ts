import { CreateAlertDalInterface } from './create-alert-dal.interface';
import { CreateCurrentDalInterface } from './create-current-dal.interface';
import { CreateDailyDalInterface } from './create-daily-dal.interface';
import { CreateHourlyDalInterface } from './create-hourly-dal.interface';
import { CreateMinutelyDalInterface } from './create-minutely-dal.interface';

export interface CreateWeatherDalInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly timezone: string;

  readonly timezoneOffset: number;

  readonly current?: CreateCurrentDalInterface;

  readonly minutely?: CreateMinutelyDalInterface[];

  readonly hourly?: CreateHourlyDalInterface[];

  readonly daily?: CreateDailyDalInterface[];

  readonly alerts?: CreateAlertDalInterface[];

  readonly createdAt: Date;
}
