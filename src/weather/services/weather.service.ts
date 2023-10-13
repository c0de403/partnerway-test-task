import { Inject, Injectable } from '@nestjs/common';
import { WEATHER_API_CONSTANTS } from 'src/weather-api/constants/weather-api.constants';
import { WeatherApiServiceInterface } from 'src/weather-api/interfaces/weather-api-service.interface';
import { CreateCurrentWeatherBllInterface } from '../interfaces/create-current-weather-bll.interface';
import { WEATHER_CONSTANTS } from '../constants/weather.constants';
import { WeatherRepositoryInterface } from '../interfaces/weather-repository.interface';
import { WeatherInterface } from '../interfaces/weather/weather.interface';

@Injectable()
export class WeatherService {
  public constructor(
    @Inject(WEATHER_API_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private readonly weatherApiService: WeatherApiServiceInterface,
    @Inject(WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN)
    private readonly weatherRepository: WeatherRepositoryInterface,
  ) {}

  public async createCurrent(
    payload: CreateCurrentWeatherBllInterface,
  ): Promise<WeatherInterface> {
    const requestedWeather = await this.weatherApiService.requestCurrentWeather(
      payload,
    );

    const weather = await this.weatherRepository.create({
      ...requestedWeather,
      createdAt: new Date(),
    });

    return weather;
  }
}
