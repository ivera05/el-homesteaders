import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestLensLogger } from 'nestlens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('E&L Homesteaders API')
    .setDescription('API for managing homesteaders')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ 'x-api-key': [] }];

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  const logger = app.get(NestLensLogger);
  app.useLogger(logger);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
