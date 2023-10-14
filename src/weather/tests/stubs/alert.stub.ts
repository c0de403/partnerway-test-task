import { faker } from '@faker-js/faker';
import { AlertInterface } from 'src/weather/interfaces/weather/alert.interface';

export class AlertStub {
  public static generateRandom(): AlertInterface {
    const alert: AlertInterface = {
      senderName: faker.word.noun(),
      event: faker.word.noun(),
      start: faker.date.anytime().getUTCMilliseconds(),
      end: faker.date.anytime().getUTCMilliseconds(),
      description: faker.word.words(),
    };

    return alert;
  }

  public static generateRandomMany(): AlertInterface[] {
    const alerts: AlertInterface[] = [
      this.generateRandom(),
      this.generateRandom(),
      this.generateRandom(),
    ];

    return alerts;
  }
}
