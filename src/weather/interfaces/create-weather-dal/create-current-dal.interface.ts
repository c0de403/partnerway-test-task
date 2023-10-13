import { CreateWeatherConditionDalInterface } from './create-weather-condition-dal.interface';

export interface CreateCurrentDalInterface {
  readonly timestamp: number;

  readonly sunrise: number;

  readonly sunset: number;

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

  readonly weatherConditions: readonly CreateWeatherConditionDalInterface[];
}
