import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CONSTANTS } from 'src/http/constants/http.constants';
import { HttpServiceInterface } from 'src/http/interfaces/http-service.interface';
import { HttpMethodEnum } from 'src/http/enums/http-method.enum';
import { EnvironmentVariableEntity } from 'src/configuration/config/entities/environment-variable.entity';
import { OpenWeatherMapCurrentWeatherDto } from '../dtos/open-weather-map-curent-weather/open-weather-map-current-weather.dto';
import { OpenWeatherMapRequestCurrentWeatherInterface } from '../interfaces/open-weather-map-request-current-weather.interface';

@Injectable()
export class OpenWeatherMapApiService {
  private readonly API_KEY: string;

  public constructor(
    @Inject(HTTP_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private readonly httpService: HttpServiceInterface,
    private readonly configService: ConfigService,
  ) {
    this.API_KEY = this.configService.get<
      EnvironmentVariableEntity['OPEN_WEATHER_MAP_API_KEY']
    >('OPEN_WEATHER_MAP_API_KEY');
  }

  public async requestCurrentWeather(
    data: OpenWeatherMapRequestCurrentWeatherInterface,
  ): Promise<OpenWeatherMapCurrentWeatherDto> {
    const url =
      'https://api.openweathermap.org/data/3.0/onecall?' +
      new URLSearchParams({
        appid: this.API_KEY,
        lat: data.lat.toString(),
        lon: data.lon.toString(),
        ...(data.exclude ? { exclude: data.exclude } : {}),
      });

    const body =
      await this.httpService.requestJsonBody<OpenWeatherMapCurrentWeatherDto>({
        url,
        method: HttpMethodEnum.Get,
      });

    return body;
  }
}
