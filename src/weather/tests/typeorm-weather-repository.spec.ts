import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { WeatherRepositoryInterface } from '../interfaces/weather-repository.interface';
import { TypeormWeatherRepository } from '../repositories/typeorm-weather.repository';
import { WEATHER_CONSTANTS } from '../constants/weather.constants';
import { TypeormWeatherEntity } from '../entities/typeorm-weater.entity';
import { WeatherStub } from './stubs/weather.stub';
import { CreateWeatherDalInterface } from '../interfaces/create-weather-dal/create-weather-dal.interface';
import { MockType } from 'src/common/tests/types/mock.type';

describe('TypeormWeatherRepository', () => {
  let repository: WeatherRepositoryInterface;
  let typeormRepository: MockType<Repository<TypeormWeatherEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
          useClass: TypeormWeatherRepository,
        },
        {
          provide: getRepositoryToken(TypeormWeatherEntity),
          useFactory: jest.fn(() => ({
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          })),
        },
      ],
    }).compile();

    repository = module.get<WeatherRepositoryInterface>(
      WEATHER_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
    );
    typeormRepository = module.get(getRepositoryToken(TypeormWeatherEntity));
  });

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    test('should successfully create', async () => {
      const weather = WeatherStub.generateRandom();
      const payload: CreateWeatherDalInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        createdAt: weather.createdAt,
      };

      jest.spyOn(typeormRepository, 'create').mockReturnValueOnce(payload);
      jest.spyOn(typeormRepository, 'save').mockReturnValueOnce(weather);

      const result = await repository.create(payload);

      expect(typeormRepository.create).toBeCalledTimes(1);
      expect(typeormRepository.create).toBeCalledWith(payload);

      expect(typeormRepository.save).toBeCalledTimes(1);
      expect(typeormRepository.save).toBeCalledWith(payload);

      expect(result).toEqual(weather);
    });

    test('should throw some unxpected error on create()', async () => {
      const weather = WeatherStub.generateRandom();
      const payload: CreateWeatherDalInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        createdAt: weather.createdAt,
      };
      const error = new Error('Some unxpected error');

      jest.spyOn(typeormRepository, 'create').mockImplementationOnce(() => {
        throw error;
      });

      await expect(repository.create(payload)).rejects.toThrow(error);

      expect(typeormRepository.create).toBeCalledTimes(1);
      expect(typeormRepository.create).toBeCalledWith(payload);

      expect(typeormRepository.save).toBeCalledTimes(0);
    });

    test('should throw some unxpected error on save()', async () => {
      const weather = WeatherStub.generateRandom();
      const payload: CreateWeatherDalInterface = {
        latitude: weather.latitude,
        longitude: weather.longitude,
        timezone: weather.timezone,
        timezoneOffset: weather.timezoneOffset,
        createdAt: weather.createdAt,
      };
      const error = new Error('Some unxpected error');

      jest.spyOn(typeormRepository, 'create').mockReturnValueOnce(payload);
      jest.spyOn(typeormRepository, 'save').mockRejectedValueOnce(() => {
        throw error;
      });

      await expect(repository.create(payload)).rejects.toThrow(error);

      expect(typeormRepository.create).toBeCalledTimes(1);
      expect(typeormRepository.create).toBeCalledWith(payload);

      expect(typeormRepository.save).toBeCalledTimes(1);
      expect(typeormRepository.save).toBeCalledWith(payload);
    });
  });
});
