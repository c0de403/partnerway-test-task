import { ExcludePartOfWeatherEnum } from '../enums/exclude-part-of-weather.enum';

export interface CreateCurrentWeatherBllInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly exclude?: ExcludePartOfWeatherEnum;
}
