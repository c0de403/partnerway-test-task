import { faker } from '@faker-js/faker';
import { FeelsLikeInterface } from 'src/weather/interfaces/weather/feels-like.interface';

export class FeelsLikeStub {
  public static generateRandom(): FeelsLikeInterface {
    const feelsLike: FeelsLikeInterface = {
      day: faker.number.int({ min: -300, max: 300 }),
      night: faker.number.int({ min: -300, max: 300 }),
      evening: faker.number.int({ min: -300, max: 300 }),
      morning: faker.number.int({ min: -300, max: 300 }),
    };

    return feelsLike;
  }
}
