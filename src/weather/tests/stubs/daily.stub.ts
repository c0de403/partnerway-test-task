import { faker } from '@faker-js/faker';
import { DailyInterface } from 'src/weather/interfaces/weather/daily.interface';
import { TemperatureStub } from './temperature.stub';
import { FeelsLikeStub } from './feels-like.stub';
import { WeatherConditionStub } from './weather-condition.stub';

export class DailyStub {
  public static generateRandom(): DailyInterface {
    const daily: DailyInterface = {
      timestamp: Date.now(),
      sunrise: faker.date.anytime().getUTCMilliseconds(),
      sunset: faker.date.anytime().getUTCMilliseconds(),
      moonrise: faker.date.anytime().getUTCMilliseconds(),
      moonset: faker.date.anytime().getUTCMilliseconds(),
      moonPhase: faker.number.float(),
      summary: faker.word.words(10),
      temperature: TemperatureStub.generateRandom(),
      feelsLike: FeelsLikeStub.generateRandom(),
      pressure: faker.number.int(10000),
      humidity: faker.number.int(100),
      dewPoint: faker.number.float(1000),
      uvi: faker.number.int(100),
      clouds: faker.number.int(1000),
      windSpeed: faker.number.float(10),
      windDegree: faker.number.int(360),
      windGust: faker.number.float(10),
      pop: faker.number.int(100),
      weatherConditions: WeatherConditionStub.generateRandomMany(),
    };

    return daily;
  }

  public static generateRandomMany(): DailyInterface[] {
    const dailies: DailyInterface[] = [
      this.generateRandom(),
      this.generateRandom(),
      this.generateRandom(),
    ];

    return dailies;
  }
}
