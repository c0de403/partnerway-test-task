import { AlertInterface } from 'src/weather-api/interfaces/current-weather/alert.interface';
import { OpenWeatherMapAlertDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-alert.dto';

export class OpenWeatherMapAlertMapper implements AlertInterface {
  public readonly senderName: string;

  public readonly event: string;

  public readonly start: number;

  public readonly end: number;

  public readonly description: string;

  public constructor(alert: OpenWeatherMapAlertDto) {
    this.senderName = alert.sender_name;
    this.event = alert.event;
    this.start = alert.start;
    this.end = alert.end;
    this.description = alert.description;
  }
}
