import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WeatherConditionInterface } from 'src/weather/interfaces/weather/weather-condition.interface';

export class ConditionResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'External weather condition ID',
  })
  public readonly externalId: number;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Group of weather parameters (Rain, Snow etc.)',
  })
  public readonly main: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Weather condition description within the group',
  })
  public readonly description: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Weather icon id',
  })
  public readonly icon: string;

  public constructor(condition: WeatherConditionInterface) {
    Object.assign(this, condition);
  }
}
