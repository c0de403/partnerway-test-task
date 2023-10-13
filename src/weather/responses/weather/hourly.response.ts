import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ConditionResponse } from './condition.response';
import { HourlyInterface } from 'src/weather/interfaces/weather/hourly.interface';

export class HourlyResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Timestamp',
  })
  public readonly timestamp: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature',
  })
  public readonly temperature: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Feels like',
  })
  public readonly feelsLike: number;

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
    description: 'A measure of the level of UV radiation',
  })
  public readonly uvi: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The clouds',
  })
  public readonly clouds: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The visibility',
  })
  public readonly visibility: number;

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
    description: 'Probability of Precipitation',
  })
  public readonly pop: number;

  @Expose()
  @ApiProperty({
    type: [ConditionResponse],
    description: 'Conditions',
  })
  public readonly weatherConditions: readonly ConditionResponse[];

  public constructor(hourly: HourlyInterface) {
    Object.assign(this, hourly);

    this.weatherConditions = hourly.weatherConditions.map((condition) => {
      return new ConditionResponse(condition);
    });
  }
}
