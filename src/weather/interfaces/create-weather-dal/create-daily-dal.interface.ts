import { CreateFeelsLikeDalInterface } from './create-feels-like-dal.interface';
import { CreateTemperatureDalInterface } from './create-temperature-dal.interface';
import { CreateWeatherConditionDalInterface } from './create-weather-condition-dal.interface';

export interface CreateDailyDalInterface {
  readonly timestamp: number;

  readonly sunrise: number;

  readonly sunset: number;

  readonly moonrise: number;

  readonly moonset: number;

  readonly moonPhase: number;

  readonly summary: string;

  readonly temperature: CreateTemperatureDalInterface;

  readonly feelsLike: CreateFeelsLikeDalInterface;

  readonly pressure: number;

  readonly humidity: number;

  readonly dewPoint: number;

  readonly windSpeed: number;

  readonly windDegree: number;

  readonly windGust?: number;

  readonly clouds: number;

  readonly pop: number;

  readonly uvi: number;

  readonly weatherConditions: readonly CreateWeatherConditionDalInterface[];
}
