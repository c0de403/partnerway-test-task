export interface CreateWeatherConditionDalInterface {
  readonly externalId: number;

  readonly main: string;

  readonly description: string;

  readonly icon: string;
}
