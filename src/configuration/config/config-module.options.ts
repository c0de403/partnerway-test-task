import { ConfigModuleOptions as ConfigModuleOptionsInterface } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariableEntity } from './entities/environment-variable.entity';
import { ValidationErrorUtil } from '../../common/utils/validation-error.util';

export class ConfigModuleOptions implements ConfigModuleOptionsInterface {
  public static isGlobal = true;

  public static validate(
    config: Record<string, unknown>,
  ): EnvironmentVariableEntity {
    const validatedConfig = plainToInstance(
      EnvironmentVariableEntity,
      config,
      /**
       * Since all variable values in .env are strings, we need to transform some of them to their
       * appropriate type (e.g. number, boolean, etc.) and use it conveniently throughout the app.
       * This option which is set to true means that the class-transformer will try to convert
       * properties implicitly to their target type based on their typing information.
       * So now in our EnvironmentVariableEntity we don't need to put the class-transformer's decorators,
       * only the class-validator's ones (in order to validate values).
       */
      { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length) {
      const prettifiedTextErrors =
        ValidationErrorUtil.prettifyAndTransformToText(errors);

      throw new Error(prettifiedTextErrors);
    }

    return validatedConfig;
  }
}
