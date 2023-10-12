import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModuleOptions } from './configuration/config/config-module.options';
import { TypeormConfig } from './configuration/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleOptions),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
    }),
  ],
})
export class AppModule {}
