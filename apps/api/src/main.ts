import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*   const storage = multer.memoryStorage();
  const upload = multer({ storage }); */

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.reduce((acc, e) => {
          acc[e.property] = Object.values(e.constraints);
          return acc;
        }, {});
        return new BadRequestException(errorMessages);
      },
    }),
  );
  /*   app.use(
    '/public/avatars',
    express.static(path.join(__dirname, '..', 'public', 'avatars')),
  ); */
  /*   app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  }); */

  await app.listen(3000);
}
bootstrap();
