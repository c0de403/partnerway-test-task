import { Expose } from 'class-transformer';
import { WeatherResponse } from './weather/weather.response';

export class InterceptedWeatherResponse {
  @Expose()
  public readonly sunrise: number;

  @Expose()
  public readonly sunset: number;

  @Expose()
  public readonly temp: number;

  @Expose()
  public readonly feels_like: number;

  @Expose()
  public readonly pressure: number;

  @Expose()
  public readonly humidity: number;

  @Expose()
  public readonly uvi: number;

  @Expose()
  public readonly wind_speed: number;

  public constructor(weather: WeatherResponse) {
    if (weather.current) {
      this.sunrise = weather.current.sunrise;
      this.sunset = weather.current.sunset;
      this.temp = weather.current.temperature;
      this.feels_like = weather.current.feelsLike;
      this.pressure = weather.current.pressure;
      this.humidity = weather.current.humidity;
      this.uvi = weather.current.uvi;
      this.wind_speed = weather.current.windSpeed;
    }
  }
}
