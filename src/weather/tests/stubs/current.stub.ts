import { faker } from '@faker-js/faker';
import { CurrentInterface } from 'src/weather/interfaces/weather/current.interface';
import { WeatherConditionStub } from './weather-condition.stub';

export class CurrentStub {
  public static generateRandom(): CurrentInterface {
    const current: CurrentInterface = {
      timestamp: Date.now(),
      sunrise: faker.date.anytime().getUTCMilliseconds(),
      sunset: faker.date.anytime().getUTCMilliseconds(),
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
      weatherConditions: WeatherConditionStub.generateRandomMany(),
    };

    return current;
  }
}
