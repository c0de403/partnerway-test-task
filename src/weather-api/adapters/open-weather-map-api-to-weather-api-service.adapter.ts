import { Injectable } from '@nestjs/common';
import { WeatherApiServiceInterface } from '../interfaces/weather-api-service.interface';
import { CurrentWeatherInterface } from '../interfaces/current-weather/current-weather.interface';
import { RequestCurrentWeatherInterface } from '../interfaces/request-current-weather.interface';
import { OpenWeatherMapApiService } from '../services/open-weather-map-api.service';
import { ExcludePartOfWeatherEnum } from 'src/weather/enums/exclude-part-of-weather.enum';
import { OpenWeatherMapExcludeEnum } from '../enums/open-weather-map-exclude.enum';
import { OpenWeatherMapCurrentWeatherMapper } from '../mappers/open-weather-map-current-weather/open-weather-map-current-weather.mapper';

@Injectable()
export class OpenWeatherMapApiToWeatherApiServiceAdapter
  implements WeatherApiServiceInterface
{
  private readonly EXCLUDE_EQUIVALENT: ReadonlyMap<
    ExcludePartOfWeatherEnum,
    OpenWeatherMapExcludeEnum
  > = new Map([
    [ExcludePartOfWeatherEnum.Alerts, OpenWeatherMapExcludeEnum.Alerts],
    [ExcludePartOfWeatherEnum.Current, OpenWeatherMapExcludeEnum.Current],
    [ExcludePartOfWeatherEnum.Daily, OpenWeatherMapExcludeEnum.Daily],
    [ExcludePartOfWeatherEnum.Hourly, OpenWeatherMapExcludeEnum.Hourly],
    [ExcludePartOfWeatherEnum.Minutely, OpenWeatherMapExcludeEnum.Minutely],
  ]);

  public constructor(
    private readonly openWeatherMapApiService: OpenWeatherMapApiService,
  ) {}

  public async requestCurrentWeather(
    data: RequestCurrentWeatherInterface,
  ): Promise<CurrentWeatherInterface> {
    const weather = await this.openWeatherMapApiService.requestCurrentWeather({
      lat: data.latitude,
      lon: data.longitude,
      ...(data.exclude
        ? { exclude: this.getExcludeEquivalent(data.exclude) }
        : {}),
    });

    const convertedWeather = new OpenWeatherMapCurrentWeatherMapper(weather);

    return convertedWeather;
  }

  private getExcludeEquivalent(
    exclude: ExcludePartOfWeatherEnum,
  ): OpenWeatherMapExcludeEnum {
    const equivalent = this.EXCLUDE_EQUIVALENT.get(exclude);

    if (equivalent === undefined) {
      throw new Error(
        `Provided unknown ExcludePartOfWeatherEnum: ${equivalent}`,
      );
    }

    return equivalent;
  }
}
