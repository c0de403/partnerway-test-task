import { OpenWeatherMapCurrentDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-current.dto';
import { CurrentInterface } from 'src/weather-api/interfaces/current-weather/current.interface';
import { WeatherConditionInterface } from 'src/weather-api/interfaces/current-weather/weather-condition.interface';
import { OpenWeatherMapWeatherMapper } from './open-weather-map-weather.mapper';

export class OpenWeatherMapCurrentMapper implements CurrentInterface {
  public readonly timestamp: number;

  public readonly sunrise: number;

  public readonly sunset: number;

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

  public readonly weatherConditions: readonly WeatherConditionInterface[];

  public constructor(current: OpenWeatherMapCurrentDto) {
    this.timestamp = current.dt;
    this.sunrise = current.sunrise;
    this.sunset = current.sunset;
    this.temperature = current.temp;
    this.feelsLike = current.feels_like;
    this.pressure = current.pressure;
    this.humidity = current.humidity;
    this.dewPoint = current.dew_point;
    this.uvi = current.uvi;
    this.clouds = current.clouds;
    this.visibility = current.visibility;
    this.windSpeed = current.wind_speed;
    this.windDegree = current.wind_deg;
    this.weatherConditions = current.weather.map((weather) => {
      return new OpenWeatherMapWeatherMapper(weather);
    });

    if (current.wind_gust) {
      this.windGust = current.wind_gust;
    }
  }
}
