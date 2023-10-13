import { OpenWeatherMapDailyDto } from 'src/weather-api/dtos/open-weather-map-curent-weather/open-weather-map-daily.dto';
import { DailyInterface } from 'src/weather-api/interfaces/current-weather/daily.interface';
import { FeelsLikeInterface } from 'src/weather-api/interfaces/current-weather/feels-like.interface';
import { TemperatureInterface } from 'src/weather-api/interfaces/current-weather/temperature.interface';
import { WeatherConditionInterface } from 'src/weather-api/interfaces/current-weather/weather-condition.interface';
import { OpenWeatherMapWeatherMapper } from './open-weather-map-weather.mapper';
import { OpenWeatherMapTempMapper } from './open-weather-map-temp.mapper';
import { OpenWeatherMapFeelsLikeMapper } from './open-weather-map-feels-like.mapper';

export class OpenWeatherMapDailyMapper implements DailyInterface {
  public readonly timestamp: number;

  public readonly sunrise: number;

  public readonly sunset: number;

  public readonly moonrise: number;

  public readonly moonset: number;

  public readonly moonPhase: number;

  public readonly summary: string;

  public readonly temperature: TemperatureInterface;

  public readonly feelsLike: FeelsLikeInterface;

  public readonly pressure: number;

  public readonly humidity: number;

  public readonly dewPoint: number;

  public readonly windSpeed: number;

  public readonly windDegree: number;

  public readonly windGust?: number;

  public readonly clouds: number;

  public readonly pop: number;

  public readonly uvi: number;

  public readonly weatherConditions: readonly WeatherConditionInterface[];

  public constructor(daily: OpenWeatherMapDailyDto) {
    this.timestamp = daily.dt;
    this.sunrise = daily.sunrise;
    this.sunset = daily.sunset;
    this.moonrise = daily.moonrise;
    this.moonset = daily.moonset;
    this.moonPhase = daily.moon_phase;
    this.summary = daily.summary;
    this.pressure = daily.pressure;
    this.humidity = daily.humidity;
    this.dewPoint = daily.dew_point;
    this.windSpeed = daily.wind_speed;
    this.windDegree = daily.wind_deg;
    this.clouds = daily.clouds;
    this.pop = daily.pop;
    this.uvi = daily.uvi;
    this.temperature = new OpenWeatherMapTempMapper(daily.temp);
    this.feelsLike = new OpenWeatherMapFeelsLikeMapper(daily.feels_like);
    this.weatherConditions = daily.weather.map((weather) => {
      return new OpenWeatherMapWeatherMapper(weather);
    });

    if (daily.wind_gust) {
      this.windGust = daily.wind_gust;
    }
  }
}
