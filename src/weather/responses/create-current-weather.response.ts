import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateCurrentWeatherResponse {
  @Expose()
  @ApiProperty({
    description:
      'Boolean flag that indicates whether the weather has been created',
    example: true,
  })
  public readonly created: boolean;

  public constructor(created: boolean) {
    this.created = created;
  }
}
