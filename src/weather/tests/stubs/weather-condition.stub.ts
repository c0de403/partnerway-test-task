import { faker } from '@faker-js/faker';
import { WeatherConditionInterface } from 'src/weather/interfaces/weather/weather-condition.interface';

export class WeatherConditionStub {
  public static generateRandom(): WeatherConditionInterface {
    const condition: WeatherConditionInterface = {
      externalId: faker.number.int(),
      main: faker.word.words(),
      description: faker.word.words(),
      icon: faker.word.words(),
    };

    return condition;
  }

  public static generateRandomMany(): WeatherConditionInterface[] {
    const conditions: WeatherConditionInterface[] = [
      this.generateRandom(),
      this.generateRandom(),
      this.generateRandom(),
    ];

    return conditions;
  }
}
