import { faker } from '@faker-js/faker';
import { MinutelyInterface } from 'src/weather/interfaces/weather/minutely.interface';

export class MinutelyStub {
  public static generateRandom(): MinutelyInterface {
    const minutely: MinutelyInterface = {
      timestamp: Date.now(),
      precipitation: faker.number.int(100),
    };

    return minutely;
  }

  public static generateRandomMany(): MinutelyInterface[] {
    const minutlies: MinutelyInterface[] = [
      this.generateRandom(),
      this.generateRandom(),
      this.generateRandom(),
    ];

    return minutlies;
  }
}
