import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MinutelyInterface } from 'src/weather/interfaces/weather/minutely.interface';

export class MinutelyResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Timestamp',
  })
  public readonly timestamp: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Precipitation',
  })
  public readonly precipitation: number;

  public constructor(minutely: MinutelyInterface) {
    Object.assign(this, minutely);
  }
}
