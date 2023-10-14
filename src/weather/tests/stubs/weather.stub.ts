import { faker } from '@faker-js/faker';
import { WeatherInterface } from 'src/weather/interfaces/weather/weather.interface';
import { CurrentStub } from './current.stub';
import { MinutelyStub } from './minutely.stub';
import { HourlyStub } from './hourly.stub';
import { AlertStub } from './alert.stub';

export class WeatherStub {
  public static generateRandom(): WeatherInterface {
    const weather: WeatherInterface = {
      id: faker.string.uuid(),
      latitude: faker.number.int({ min: -90, max: 90 }),
      longitude: faker.number.int({ min: -180, max: 180 }),
      timezone: faker.word.noun(),
      timezoneOffset: faker.number.int(),
      current: CurrentStub.generateRandom(),
      minutely: MinutelyStub.generateRandomMany(),
      hourly: HourlyStub.generateRandomMany(),
      alerts: AlertStub.generateRandomMany(),
      createdAt: new Date(),
    };

    return weather;
  }
}
