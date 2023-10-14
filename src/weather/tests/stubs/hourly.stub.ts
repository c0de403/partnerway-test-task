import { faker } from '@faker-js/faker';
import { WeatherConditionStub } from './weather-condition.stub';
import { HourlyInterface } from 'src/weather/interfaces/weather/hourly.interface';

export class HourlyStub {
  public static generateRandom(): HourlyInterface {
    const hourly: HourlyInterface = {
      timestamp: Date.now(),
      temperature: faker.number.float({ min: -300, max: 300 }),
      feelsLike: faker.number.float({ min: -300, max: 300 }),
      pressure: faker.number.int(10000),
      humidity: faker.number.int(100),
      dewPoint: faker.number.float(1000),
      uvi: faker.number.int(100),
      clouds: faker.number.int(1000),
      visibility: faker.number.int(10000),
      windSpeed: faker.number.float(10),
      windDegree: faker.number.int(360),
      windGust: faker.number.float(10),
      pop: faker.number.int(100),
      weatherConditions: WeatherConditionStub.generateRandomMany(),
    };

    return hourly;
  }

  public static generateRandomMany(): HourlyInterface[] {
    const hourlies: HourlyInterface[] = [
      this.generateRandom(),
      this.generateRandom(),
      this.generateRandom(),
    ];

    return hourlies;
  }
}
