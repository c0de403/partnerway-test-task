import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentVariableEntity } from './configuration/config/entities/environment-variable.entity';
import { ValidationPipeOptions } from './configuration/validation-pipe/validation-pipe.options';
import { UnknownErrorExceptionFilter } from './common/exception-filters/unknown-error.exception-filter';
import { ErrorExceptionFilter } from './common/exception-filters/error.exception-filter';
import { HttpExceptionFilter } from './common/exception-filters/http.exception-filter';
import { DomainErrorExceptionFilter } from './common/exception-filters/domain-error.exception-filter';

async function bootstrap(): Promise<void> {
  /**
   * **Project Dependency Architecture Note**:
   *
   * The application has been designed to directly rely on the Express platform within the NestJS framework.
   * While Fastify's lightness has the edge over Express's performance (which was not intended to be the main
   * objective of the project), Express has been chosen for its maturity, larger ecosystem, and huger and active
   * community ensuring access to more extensive resources.
   *
   * So, after careful consideration and taking into account the fact that platform changing is quite a rare case,
   * we have opted directly relying on the platform for the following reasons:
   *
   * 1. **Avoiding Over-Abstraction and Reduced Complexity**: We do not have to rewrite many functions of
   *    Express by creating abstractions. Given the nuances and specific functions that Express offers,
   *    attempting to create an additional layer of abstraction to accommodate both Express and Fastify would
   *    introduce complexity. This would not only add to our development overhead but also might risk
   *    obfuscating the underlying platform's strengths.
   *
   * 2. **Convenience**: We can interact directly with Express, without going through layers of abstraction.
   *    This makes it easier to debug and troubleshoot our app.
   *
   * Implications of reliance on the platform:
   *
   * 1. **Less Flexibility**: We cannot easily switch to a different Fastify or another presumable
   *    implementation in the future.
   *
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();
  const config = app.get(ConfigService<EnvironmentVariableEntity>);
  const PORT = config.get<EnvironmentVariableEntity['APP_PORT']>('APP_PORT');
  const reflector = app.get<Reflector>(Reflector);

  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  /**
   * Exception filters' priorities are in the reverse order than the order they are registered.
   * It means that the last filter registered with app.useGlobalFilters() will be triggered the first.
   * Source: https://stackoverflow.com/a/54736646.
   */
  app.useGlobalFilters(
    new UnknownErrorExceptionFilter(),
    new ErrorExceptionFilter(),
    new HttpExceptionFilter(),
    new DomainErrorExceptionFilter(),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  express.disable('x-powered-by');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Partnerway (Spendbase) Test Task API')
    .setDescription('Partnerway (Spendbase) Test Task API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);
}

bootstrap();
