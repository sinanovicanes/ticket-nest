import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
