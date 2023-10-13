import { ExcludePartOfWeatherEnum } from '../enums/exclude-part-of-weather.enum';

export interface FindLatestWeatherByLocationDalInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly exclude?: ExcludePartOfWeatherEnum;
}
