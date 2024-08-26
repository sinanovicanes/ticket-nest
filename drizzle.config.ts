import { MIGRATIONS_FOLDER } from '@app/database/constants';
import { defineConfig } from 'drizzle-kit';

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL;
  }

  return process.env.DATABASE_URL.replace(
    process.env.DATABASE_HOST,
    'localhost',
  );
};

export default defineConfig({
  schema: './libs/database/src/schemas/index.ts',
  out: MIGRATIONS_FOLDER,
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
