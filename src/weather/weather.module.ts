import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormWeatherEntity } from './entities/typeorm-weater.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './services/weather.service';
import { WeatherApiModule } from 'src/weather-api/weather-api.module';
import { WeatherRepositoryProvider } from './providers/weather-repository.provider';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormWeatherEntity]), WeatherApiModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherRepositoryProvider],
})
export class WeatherModule {}
