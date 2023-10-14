import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../services/weather.service';
import { WeatherRepositoryInterface } from '../interfaces/weather-repository.interface';
import { WeatherApiServiceInterface } from 'src/weather-api/interfaces/weather-api-service.interface';
import { WEATHER_CONSTANTS } from '../constants/weather.constants';
import { WEATHER_API_CONSTANTS } from 'src/weather-api/constants/weather-api.constants';
import { WeatherStub } from './stubs/weather.stub';
import { GetLatestWeatherByLocationBllInterface } from '../interfaces/get-latest-weather-by-location-bll.interface';
import { WeatherError } from '../errors/weather.error';
import { ExcludePartOfWeatherEnum } from '../enums/exclude-part-of-weather.enum';
import { WeatherInterface } from '../interfaces/weather/weather.interface';
import { CreateCurrentWeatherBllInterface } from '../interfaces/create-current-weather-bll.interface';
import { CurrentWeatherInterface } from 'src/weather-api/interfaces/current-weather/current-weather.interface';

describe('WeatherService', () => {
  let service: WeatherService;
  let repository: WeatherRepositoryInterface;
  let apiService: WeatherApiServiceInterface;

  const timestamp = new Date();

  beforeAll(() => {
    jest.useFakeTimers({ now: timestamp });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
          useValue: {
            findLatestByLocation: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: WEATHER_API_CONSTANTS.APPLICATION.SERVICE_TOKEN,
          useValue: {
            requestCurrentWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    repository = module.get<WeatherRepositoryInterface>(
      WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
    );
    apiService = module.get<WeatherApiServiceInterface>(
      WEATHER_API_CONSTANTS.APPLICATION.SERVICE_TOKEN,
    );
  });

  test('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLatestByLocation', () => {
    test('should successfully get with minimum payload', async () => {
      const weather = WeatherStub.generateRandom();
      const payload: GetLatestWeatherByLocationBllInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
      };

      jest
        .spyOn(repository, 'findLatestByLocation')
        .mockResolvedValueOnce(weather);

      const result = await service.getLatestByLocation(payload);

      expect(repository.findLatestByLocation).toBeCalledTimes(1);
      expect(repository.findLatestByLocation).toBeCalledWith(payload);

      expect(result).toBe(weather);
    });

    test('should successfully get with full payload', async () => {
      const randomWeather = WeatherStub.generateRandom();
      /**
       * Weather with not included "minutely" should be returned according to the payload.
       */
      const weather: WeatherInterface = {
        id: randomWeather.id,
        latitude: randomWeather.latitude,
        longitude: randomWeather.longitude,
        timezone: randomWeather.timezone,
        timezoneOffset: randomWeather.timezoneOffset,
        current: randomWeather.current,
        hourly: randomWeather.hourly,
        daily: randomWeather.daily,
        alerts: randomWeather.alerts,
        createdAt: randomWeather.createdAt,
      };
      const payload: GetLatestWeatherByLocationBllInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        exclude: ExcludePartOfWeatherEnum.Minutely,
      };

      jest
        .spyOn(repository, 'findLatestByLocation')
        .mockResolvedValueOnce(weather);

      const result = await service.getLatestByLocation(payload);

      expect(repository.findLatestByLocation).toBeCalledTimes(1);
      expect(repository.findLatestByLocation).toBeCalledWith(payload);

      expect(result).toBe(weather);
    });

    test('should throw not found error', async () => {
      const payload: GetLatestWeatherByLocationBllInterface = {
        latitude: 50.450001,
        longitude: 30.523333,
      };

      jest
        .spyOn(repository, 'findLatestByLocation')
        .mockResolvedValueOnce(null);

      await expect(service.getLatestByLocation(payload)).rejects.toThrow(
        WeatherError.NotFound,
      );

      expect(repository.findLatestByLocation).toBeCalledTimes(1);
      expect(repository.findLatestByLocation).toBeCalledWith(payload);
    });

    test('should throw some unexpected repository error on findLatestByLocation()', async () => {
      const payload: GetLatestWeatherByLocationBllInterface = {
        latitude: 50.450001,
        longitude: 30.523333,
      };
      const error = new Error('Some unexpected repository error');

      jest
        .spyOn(repository, 'findLatestByLocation')
        .mockRejectedValueOnce(error);

      await expect(service.getLatestByLocation(payload)).rejects.toThrow(error);

      expect(repository.findLatestByLocation).toBeCalledTimes(1);
      expect(repository.findLatestByLocation).toBeCalledWith(payload);
    });
  });

  describe('createCurrent', () => {
    test('should successfully create with minimum payload', async () => {
      const weather = WeatherStub.generateRandom();
      const requestedWeather: CurrentWeatherInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        current: weather.current,
        minutely: weather.minutely.map((minutely) => minutely),
        hourly: weather.hourly.map((hourly) => hourly),
        daily: weather.daily.map((daily) => daily),
        alerts: weather.alerts.map((alert) => alert),
      };
      const payload: CreateCurrentWeatherBllInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
      };

      jest
        .spyOn(apiService, 'requestCurrentWeather')
        .mockResolvedValueOnce(requestedWeather);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(weather);

      const result = await service.createCurrent(payload);

      expect(apiService.requestCurrentWeather).toBeCalledTimes(1);
      expect(apiService.requestCurrentWeather).toBeCalledWith(payload);

      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith({
        ...requestedWeather,
        createdAt: timestamp,
      });

      expect(result).toEqual(weather);
    });

    test('should successfully create with full payload', async () => {
      const randomWeather = WeatherStub.generateRandom();
      /**
       * Weather with excluded "daily" should be requested and created according to the payload.
       */
      const weather: WeatherInterface = {
        id: randomWeather.id,
        latitude: randomWeather.latitude,
        longitude: randomWeather.longitude,
        timezone: randomWeather.timezone,
        timezoneOffset: randomWeather.timezoneOffset,
        current: randomWeather.current,
        minutely: randomWeather.minutely,
        hourly: randomWeather.hourly,
        alerts: randomWeather.alerts,
        createdAt: randomWeather.createdAt,
      };
      const requestedWeather: CurrentWeatherInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        current: weather.current,
        minutely: weather.minutely.map((minutely) => minutely),
        hourly: weather.hourly.map((hourly) => hourly),
        alerts: weather.alerts.map((alert) => alert),
      };
      const payload: CreateCurrentWeatherBllInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        exclude: ExcludePartOfWeatherEnum.Daily,
      };

      jest
        .spyOn(apiService, 'requestCurrentWeather')
        .mockResolvedValueOnce(requestedWeather);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(weather);

      const result = await service.createCurrent(payload);

      expect(apiService.requestCurrentWeather).toBeCalledTimes(1);
      expect(apiService.requestCurrentWeather).toBeCalledWith(payload);

      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith({
        ...requestedWeather,
        createdAt: timestamp,
      });

      expect(result).toEqual(weather);
    });

    test('should throw some unexpected error on requestCurrentWeather()', async () => {
      const payload: CreateCurrentWeatherBllInterface = {
        latitude: 50.450001,
        longitude: 30.523333,
      };
      const error = new Error('Some unexpected error');

      jest
        .spyOn(apiService, 'requestCurrentWeather')
        .mockRejectedValueOnce(error);

      await expect(service.createCurrent(payload)).rejects.toThrow(error);

      expect(apiService.requestCurrentWeather).toBeCalledTimes(1);
      expect(apiService.requestCurrentWeather).toBeCalledWith(payload);

      expect(repository.create).toBeCalledTimes(0);
    });

    test('should throw some unexpected error on create()', async () => {
      const weather = WeatherStub.generateRandom();
      const requestedWeather: CurrentWeatherInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        current: weather.current,
        minutely: weather.minutely.map((minutely) => minutely),
        hourly: weather.hourly.map((hourly) => hourly),
        daily: weather.daily.map((daily) => daily),
        alerts: weather.alerts.map((alert) => alert),
      };
      const payload: CreateCurrentWeatherBllInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
      };
      const error = new Error('Some unexpected error');

      jest
        .spyOn(apiService, 'requestCurrentWeather')
        .mockResolvedValueOnce(requestedWeather);
      jest.spyOn(repository, 'create').mockRejectedValueOnce(error);

      await expect(service.createCurrent(payload)).rejects.toThrow(error);

      expect(apiService.requestCurrentWeather).toBeCalledTimes(1);
      expect(apiService.requestCurrentWeather).toBeCalledWith(payload);

      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith({
        ...requestedWeather,
        createdAt: timestamp,
      });
    });
  });
});
