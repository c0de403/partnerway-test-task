import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AlertInterface } from 'src/weather/interfaces/weather/alert.interface';

export class AlertResponse {
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Name of the alert source',
  })
  public readonly senderName: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Alert event name',
  })
  public readonly event: string;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Date and time of the start of the alert, Unix, UTC',
  })
  public readonly start: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    description: 'Date and time of the end of the alert, Unix, UTC',
  })
  public readonly end: number;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Description of the alert',
  })
  public readonly description: string;

  public constructor(alert: AlertInterface) {
    Object.assign(this, alert);
  }
}
