import { OpenWeatherMapHourlyDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-hourly.dto';
import { HourlyInterface } from 'src/weather-api/interfaces/current-weather/hourly.interface';
import { WeatherConditionInterface } from 'src/weather-api/interfaces/current-weather/weather-condition.interface';
import { OpenWeatherMapWeatherMapper } from './open-weather-map-weather.mapper';

export class OpenWeatherMapHourlyMapper implements HourlyInterface {
  public readonly timestamp: number;

  public readonly temperature: number;

  public readonly feelsLike: number;

  public readonly pressure: number;

  public readonly humidity: number;

  public readonly dewPoint: number;

  public readonly uvi: number;

  public readonly clouds: number;

  public readonly visibility: number;

  public readonly windSpeed: number;

  public readonly windDegree: number;

  public readonly windGust?: number;

  public readonly pop: number;

  public readonly weatherConditions: readonly WeatherConditionInterface[];

  public constructor(hourly: OpenWeatherMapHourlyDto) {
    this.timestamp = hourly.dt;
    this.temperature = hourly.temp;
    this.feelsLike = hourly.feels_like;
    this.pressure = hourly.pressure;
    this.humidity = hourly.humidity;
    this.dewPoint = hourly.dew_point;
    this.uvi = hourly.uvi;
    this.clouds = hourly.clouds;
    this.visibility = hourly.visibility;
    this.windSpeed = hourly.wind_speed;
    this.windDegree = hourly.wind_deg;
    this.pop = hourly.pop;
    this.weatherConditions = hourly.weather.map((weather) => {
      return new OpenWeatherMapWeatherMapper(weather);
    });

    if (hourly.wind_gust) {
      this.windGust = hourly.wind_gust;
    }
  }
}
