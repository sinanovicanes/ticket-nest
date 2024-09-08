import { CacheInterceptor } from '@nestjs/cache-manager';
import { Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const CacheInterceptorProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: CacheInterceptor,
};
