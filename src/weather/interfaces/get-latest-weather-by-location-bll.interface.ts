import { ExcludePartOfWeatherEnum } from '../enums/exclude-part-of-weather.enum';

export interface GetLatestWeatherByLocationBllInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly exclude?: ExcludePartOfWeatherEnum;
}
