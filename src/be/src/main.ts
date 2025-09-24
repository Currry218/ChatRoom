import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FRONT_END_URL'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.error('Validation errors:', errors);
        return new BadRequestException(errors);
      },
    }),
  );

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
