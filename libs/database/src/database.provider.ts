import { Provider } from '@nestjs/common';
import { DB_PROVIDER_TOKEN } from './constants';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DatabaseProvider: Provider = {
  provide: DB_PROVIDER_TOKEN,
  useExisting: ConfigService,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const client = new Client({
      connectionString: configService.get<string>('DATABASE_URL'),
    });

    await client.connect();

    return drizzle(client);
  },
};
