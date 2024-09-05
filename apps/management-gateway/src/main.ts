import { NestFactory } from '@nestjs/core';
import { ManagementGatewayModule } from './management-gateway.module';
import { ConfigService } from '@nestjs/config';
import { RpcExceptionFilter } from '@app/common/filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ManagementGatewayModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.setGlobalPrefix('management');
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
