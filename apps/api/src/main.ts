import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
