import { CreateWeatherConditionDalInterface } from './create-weather-condition-dal.interface';

export interface CreateHourlyDalInterface {
  readonly timestamp: number;

  readonly temperature: number;

  readonly feelsLike: number;

  readonly pressure: number;

  readonly humidity: number;

  readonly dewPoint: number;

  readonly uvi: number;

  readonly clouds: number;

  readonly visibility: number;

  readonly windSpeed: number;

  readonly windDegree: number;

  readonly windGust?: number;

  readonly pop: number;

  readonly weatherConditions: readonly CreateWeatherConditionDalInterface[];
}
