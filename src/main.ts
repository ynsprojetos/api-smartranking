import { AllExceptionFilter } from './common/filters/pipes/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter())

  await app.listen(3000);
}
bootstrap();
