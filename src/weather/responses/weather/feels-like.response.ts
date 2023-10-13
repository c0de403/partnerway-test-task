import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FeelsLikeInterface } from 'src/weather/interfaces/weather/feels-like.interface';

export class FeelsLikeResponse {
  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature feels like in the day',
  })
  public readonly day: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature feels like in the night',
  })
  public readonly night: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature feels like in the evening',
  })
  public readonly evening: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'The temperature feels like in the morning',
  })
  public readonly morning: number;

  public constructor(feelsLike: FeelsLikeInterface) {
    Object.assign(this, feelsLike);
  }
}
