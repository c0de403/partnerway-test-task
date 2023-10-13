import { HttpStatus } from '@nestjs/common';
import { DomainError } from 'src/common/errors/domain.error';

export class WeatherError {
  public static NotFound = class extends DomainError {
    public constructor() {
      const name = 'WeatherNotFoundError';
      const message = 'Weather has not been found';
      const statusCode = HttpStatus.NOT_FOUND;

      super(name, message, statusCode);
    }
  };
}
