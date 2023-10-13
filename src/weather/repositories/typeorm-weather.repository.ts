import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherRepositoryInterface } from '../interfaces/weather-repository.interface';
import { TypeormWeatherEntity } from '../entities/typeorm-weater.entity';
import { CreateWeatherDalInterface } from '../interfaces/create-weather-dal/create-weather-dal.interface';
import { WeatherInterface } from '../interfaces/weather/weather.interface';
import { FindLatestWeatherByLocationDalInterface } from '../interfaces/find-latest-weather-by-location-dal.interface';

@Injectable()
export class TypeormWeatherRepository implements WeatherRepositoryInterface {
  public constructor(
    @InjectRepository(TypeormWeatherEntity)
    private readonly repository: Repository<TypeormWeatherEntity>,
  ) {}

  public async findLatestByLocation(
    data: FindLatestWeatherByLocationDalInterface,
  ): Promise<WeatherInterface> {
    const columnsMetadata = this.repository.metadata.columns.values();
    const select = [];

    for (const columnMetadata of columnsMetadata) {
      if (data.exclude === columnMetadata.propertyName) {
        continue;
      }
      select.push(columnMetadata.propertyName);
    }

    const weather = await this.repository.findOne({
      where: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      order: {
        createdAt: 'DESC',
      },
      select,
    });

    return weather;
  }

  public async create(
    data: CreateWeatherDalInterface,
  ): Promise<WeatherInterface> {
    const weather = this.repository.create(data);

    return this.repository.save(weather);
  }
}
