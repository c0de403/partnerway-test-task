import { WeatherConditionInterface } from './weather-condition.interface';

export interface HourlyInterface {
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

  readonly weatherConditions: readonly WeatherConditionInterface[];
}
