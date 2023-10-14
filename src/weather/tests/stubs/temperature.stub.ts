import { faker } from '@faker-js/faker';
import { TemperatureInterface } from 'src/weather/interfaces/weather/temperature.interface';

export class TemperatureStub {
  public static generateRandom(): TemperatureInterface {
    const temperature: TemperatureInterface = {
      day: faker.number.int({ min: -300, max: 300 }),
      min: faker.number.int({ min: -300, max: 300 }),
      max: faker.number.int({ min: -300, max: 300 }),
      night: faker.number.int({ min: -300, max: 300 }),
      evening: faker.number.int({ min: -300, max: 300 }),
      morning: faker.number.int({ min: -300, max: 300 }),
    };

    return temperature;
  }
}
