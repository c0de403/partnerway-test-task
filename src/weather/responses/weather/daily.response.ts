import { Expose } from 'class-transformer';
import { ConditionResponse } from './condition.response';
import { FeelsLikeResponse } from './feels-like.response';
import { TemperatureResponse } from './temperature.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DailyInterface } from 'src/weather/interfaces/weather/daily.interface';

export class DailyResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The Unix timestamp',
  })
  public readonly timestamp: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The sunrise Unix timestamp',
  })
  public readonly sunrise: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The sunset Unix timestamp',
  })
  public readonly sunset: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The moonrise Unix timestamp',
  })
  public readonly moonrise: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The moonset Unix timestamp',
  })
  public readonly moonset: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The moon phase',
  })
  public readonly moonPhase: number;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'The summary',
  })
  public readonly summary: string;

  @Expose()
  @ApiProperty({
    type: TemperatureResponse,
    description: 'The temperature',
  })
  public readonly temperature: TemperatureResponse;

  @Expose()
  @ApiProperty({
    type: FeelsLikeResponse,
    description: 'Feels like',
  })
  public readonly feelsLike: FeelsLikeResponse;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The pressure',
  })
  public readonly pressure: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The humidity',
  })
  public readonly humidity: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The dew point',
  })
  public readonly dewPoint: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The wind speed',
  })
  public readonly windSpeed: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The wind degree',
  })
  public readonly windDegree: number;

  @Expose()
  @ApiPropertyOptional({
    type: 'number',
    nullable: true,
    description: 'The wind gust',
  })
  public readonly windGust?: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The clouds',
  })
  public readonly clouds: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Probability of Precipitation',
  })
  public readonly pop: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'A measure of the level of UV radiation',
  })
  public readonly uvi: number;

  @Expose()
  @ApiProperty({
    type: [ConditionResponse],
    description: 'Conditions',
  })
  public readonly weatherConditions: readonly ConditionResponse[];

  public constructor(daily: DailyInterface) {
    Object.assign(this, daily);

    this.temperature = new TemperatureResponse(daily.temperature);
    this.feelsLike = new FeelsLikeResponse(daily.feelsLike);
    this.weatherConditions = daily.weatherConditions.map((condition) => {
      return new ConditionResponse(condition);
    });
  }
}
