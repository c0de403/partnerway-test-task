import { Module } from '@nestjs/common';
import { WeatherApiServiceProvider } from './providers/weather-api-service.provider';
import { HttpModule } from 'src/http/http.module';
import { OpenWeatherMapApiService } from './services/open-weather-map-api.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherApiServiceProvider, OpenWeatherMapApiService],
  exports: [WeatherApiServiceProvider],
})
export class WeatherApiModule {}
