import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherRepositoryInterface } from '../interfaces/weather-repository.interface';
import { TypeormWeatherEntity } from '../entities/typeorm-weater.entity';
import { CreateWeatherDalInterface } from '../interfaces/create-weather-dal/create-weather-dal.interface';
import { WeatherInterface } from '../interfaces/weather/weather.interface';

@Injectable()
export class TypeormWeatherRepository implements WeatherRepositoryInterface {
  public constructor(
    @InjectRepository(TypeormWeatherEntity)
    private readonly repository: Repository<TypeormWeatherEntity>,
  ) {}

  public async create(
    data: CreateWeatherDalInterface,
  ): Promise<WeatherInterface> {
    const weather = this.repository.create(data);

    return this.repository.save(weather);
  }
}
