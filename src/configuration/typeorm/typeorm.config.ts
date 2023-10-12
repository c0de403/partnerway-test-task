import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvironmentVariableEntity } from '../config/entities/environment-variable.entity';
import { EnvironmentEnum } from 'src/common/enums/environment.enum';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  private readonly HOST =
    this.configService.get<EnvironmentVariableEntity['DATABASE_HOST']>(
      'DATABASE_HOST',
    );

  private readonly PORT =
    this.configService.get<EnvironmentVariableEntity['DATABASE_PORT']>(
      'DATABASE_PORT',
    );

  private readonly USERNAME =
    this.configService.get<EnvironmentVariableEntity['DATABASE_USERNAME']>(
      'DATABASE_USERNAME',
    );

  private readonly PASSWORD =
    this.configService.get<EnvironmentVariableEntity['DATABASE_PASSWORD']>(
      'DATABASE_PASSWORD',
    );

  private readonly NAME =
    this.configService.get<EnvironmentVariableEntity['DATABASE_NAME']>(
      'DATABASE_NAME',
    );

  public constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment =
      this.configService.get<EnvironmentVariableEntity['NODE_ENV']>('NODE_ENV');

    switch (environment) {
      case EnvironmentEnum.Production: {
        return this.production();
      }
      case EnvironmentEnum.Test: {
        return this.test();
      }
      case EnvironmentEnum.Development: {
        return this.development();
      }
      default: {
        throw new Error(`Unknown EnvironmentEnum value: ${EnvironmentEnum}`);
      }
    }
  }

  private development(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      autoLoadEntities: true,
      migrations: ['./dist/database/migrations/*.js'],
      host: this.HOST,
      port: this.PORT,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.NAME,
    };
  }

  private test(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      autoLoadEntities: true,
      migrations: ['./dist/database/test-migrations/*.js'],
      host: this.HOST,
      port: this.PORT,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.NAME,
    };
  }

  private production(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      autoLoadEntities: true,
      migrations: ['./dist/database/migrations/*.js'],
      host: this.HOST,
      port: this.PORT,
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.NAME,
    };
  }
}
