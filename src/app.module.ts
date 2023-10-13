import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModuleOptions } from './configuration/config/config-module.options';
import { TypeormConfig } from './configuration/typeorm/typeorm.config';
import { HttpModule } from './http/http.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherApiModule } from './weather-api/weather-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
    }),
    HttpModule,
    WeatherModule,
    WeatherApiModule,
  ],
})
export class AppModule {}
