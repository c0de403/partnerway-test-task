import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AlertResponse } from './alert.response';
import { CurrentResponse } from './current.response';
import { DailyResponse } from './daily.response';
import { HourlyResponse } from './hourly.response';
import { MinutelyResponse } from './minutely.response';
import { WeatherInterface } from 'src/weather/interfaces/weather/weather.interface';

export class WeatherResponse {
  @Expose()
  @ApiProperty({
    type: 'string',
    description: `Weather's ID`,
    example: '2b0b9352-3167-4b88-a3f3-1ce52120a42d',
  })
  public readonly id: string;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Latitude of the location',
    example: 33.44,
  })
  public readonly latitude: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Longitude of the location',
    example: -94.04,
  })
  public readonly longitude: number;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Timezone name for the requested location',
    example: 'America/Chicago',
  })
  public readonly timezone: string;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Shift in seconds from UTC',
    example: -18000,
  })
  public readonly timezoneOffset: number;

  @Expose()
  @ApiPropertyOptional({
    type: CurrentResponse,
    nullable: true,
    description: 'Current weather forecast',
  })
  public readonly current?: CurrentResponse;

  @Expose()
  @ApiPropertyOptional({
    type: [MinutelyResponse],
    nullable: true,
    description: 'Minutely weather forecast',
  })
  public readonly minutely?: readonly MinutelyResponse[];

  @Expose()
  @ApiPropertyOptional({
    type: [HourlyResponse],
    nullable: true,
    description: 'Hourly weather forecast',
  })
  public readonly hourly?: readonly HourlyResponse[];

  @Expose()
  @ApiPropertyOptional({
    type: [DailyResponse],
    nullable: true,
    description: 'Daily weather forecast',
  })
  public readonly daily?: readonly DailyResponse[];

  @Expose()
  @ApiPropertyOptional({
    type: [AlertResponse],
    nullable: true,
    description: 'Possible alerts',
  })
  public readonly alerts?: readonly AlertResponse[];

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'The date of the weather creation on the server',
  })
  public readonly createdAt: string;

  public constructor(weather: WeatherInterface) {
    Object.assign(this, weather);

    if (weather.current) {
      this.current = new CurrentResponse(weather.current);
    }
    if (weather.minutely) {
      this.minutely = weather.minutely.map((minutely) => {
        return new MinutelyResponse(minutely);
      });
    }
    if (weather.hourly) {
      this.hourly = weather.hourly.map((hourly) => {
        return new HourlyResponse(hourly);
      });
    }
    if (weather.daily) {
      this.daily = weather.daily.map((daily) => {
        return new DailyResponse(daily);
      });
    }
    if (weather.alerts) {
      this.alerts = weather.alerts.map((alert) => {
        return new AlertResponse(alert);
      });
    }
  }
}
