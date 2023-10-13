import { OpenWeatherMapTempDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-temp.dto';
import { TemperatureInterface } from 'src/weather-api/interfaces/current-weather/temperature.interface';

export class OpenWeatherMapTempMapper implements TemperatureInterface {
  public readonly day: number;

  public readonly min: number;

  public readonly max: number;

  public readonly night: number;

  public readonly evening: number;

  public readonly morning: number;

  public constructor(temp: OpenWeatherMapTempDto) {
    this.day = temp.day;
    this.min = temp.min;
    this.max = temp.max;
    this.night = temp.night;
    this.evening = temp.eve;
    this.morning = temp.morn;
  }
}
