import { FeelsLikeInterface } from './feels-like.interface';
import { TemperatureInterface } from './temperature.interface';
import { WeatherConditionInterface } from './weather-condition.interface';

export interface DailyInterface {
  readonly timestamp: number;

  readonly sunrise: number;

  readonly sunset: number;

  readonly moonrise: number;

  readonly moonset: number;

  readonly moonPhase: number;

  readonly summary: string;

  readonly temperature: TemperatureInterface;

  readonly feelsLike: FeelsLikeInterface;

  readonly pressure: number;

  readonly humidity: number;

  readonly dewPoint: number;

  readonly windSpeed: number;

  readonly windDegree: number;

  readonly windGust?: number;

  readonly clouds: number;

  readonly pop: number;

  readonly uvi: number;

  readonly weatherConditions: readonly WeatherConditionInterface[];
}
