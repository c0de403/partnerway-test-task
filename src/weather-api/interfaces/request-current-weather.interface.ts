import { ExcludePartOfWeatherEnum } from '../../weather/enums/exclude-part-of-weather.enum';

export interface RequestCurrentWeatherInterface {
  readonly latitude: number;

  readonly longitude: number;

  readonly exclude?: ExcludePartOfWeatherEnum;
}
