import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, Min, Max, IsNumber } from 'class-validator';
import { WEATHER_CONSTANTS } from '../constants/weather.constants';
import { ExcludePartOfWeatherEnum } from '../enums/exclude-part-of-weather.enum';

export class GetWeatherDto {
  @IsNumber()
  @Min(WEATHER_CONSTANTS.DOMAIN.LATITUDE_MIN_VALUE)
  @Max(WEATHER_CONSTANTS.DOMAIN.LATITUDE_MAX_VALUE)
  @ApiProperty({
    type: 'number',
    description: 'Latitude of a place',
    minimum: WEATHER_CONSTANTS.DOMAIN.LATITUDE_MIN_VALUE,
    maximum: WEATHER_CONSTANTS.DOMAIN.LATITUDE_MAX_VALUE,
  })
  public readonly latitude: number;

  @IsNumber()
  @Min(WEATHER_CONSTANTS.DOMAIN.LONGITUDE_MIN_VALUE)
  @Max(WEATHER_CONSTANTS.DOMAIN.LONGITUDE_MAX_VALUE)
  @ApiProperty({
    type: 'number',
    description: 'Longitude of a place',
    minimum: WEATHER_CONSTANTS.DOMAIN.LONGITUDE_MIN_VALUE,
    maximum: WEATHER_CONSTANTS.DOMAIN.LONGITUDE_MAX_VALUE,
  })
  public readonly longitude: number;

  @IsEnum(ExcludePartOfWeatherEnum)
  @IsOptional()
  @ApiPropertyOptional({
    type: 'enum',
    nullable: true,
    enum: ExcludePartOfWeatherEnum,
    description: 'A part of a weather which can be excluded',
  })
  public readonly exclude?: ExcludePartOfWeatherEnum;
}
