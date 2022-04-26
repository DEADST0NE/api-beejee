import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { PrismaService } from '../prisma/prisma.service';

import { enableCorsUrls } from './_utils/common';

import { AppModule } from './app.module';
import { ValidationPipeOptions } from './_core/pipe/validation.pipe';
import { CoreExceptionFilter } from './_core/exception/core.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Init prisma
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Config cors
  app.enableCors({
    origin: enableCorsUrls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validate data
  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions));

  // Global сatch the error
  app.useGlobalFilters(new CoreExceptionFilter());

  // Start application
  await app.listen(process.env.APP_PORT);
}
bootstrap();
