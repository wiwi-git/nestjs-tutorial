import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4000;

  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port);
  Logger.verbose(`port: ${port}`);
}
bootstrap();
