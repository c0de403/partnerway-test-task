import { OpenWeatherMapExcludeEnum } from '../enums/open-weather-map-exclude.enum';

export interface OpenWeatherMapRequestCurrentWeatherInterface {
  readonly lat: number;

  readonly lon: number;

  readonly exclude?: OpenWeatherMapExcludeEnum;
}
