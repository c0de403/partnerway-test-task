import { IsEnum, IsNumber, IsString, Validate } from 'class-validator';
import { PortNumberValidator } from '../../../common/validators/port-number.validator';
import { HostValidator } from '../../../common/validators/host.validator';
import { EnvironmentEnum } from 'src/common/enums/environment.enum';

export class EnvironmentVariableEntity {
  @IsEnum(EnvironmentEnum)
  public readonly NODE_ENV: EnvironmentEnum;

  @IsNumber()
  @Validate(PortNumberValidator)
  public readonly APP_PORT: number;

  @IsString()
  @Validate(HostValidator)
  public readonly DATABASE_HOST: string;

  @IsNumber()
  @Validate(PortNumberValidator)
  public readonly DATABASE_PORT: number;

  @IsString()
  public readonly DATABASE_USERNAME: string;

  @IsString()
  public readonly DATABASE_PASSWORD: string;

  @IsString()
  public readonly DATABASE_NAME: string;
}
