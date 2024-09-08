import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const ClassSerializationProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};
