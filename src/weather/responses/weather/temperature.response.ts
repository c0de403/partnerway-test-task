import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TemperatureInterface } from 'src/weather/interfaces/weather/temperature.interface';

export class TemperatureResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature in the day',
  })
  public readonly day: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The min temperature',
  })
  public readonly min: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The max temperature',
  })
  public readonly max: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature in the night',
  })
  public readonly night: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature in the evening',
  })
  public readonly evening: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature in the morning',
  })
  public readonly morning: number;

  public constructor(temperature: TemperatureInterface) {
    Object.assign(this, temperature);
  }
}
