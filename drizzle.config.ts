import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './libs/database/src/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL.replace(
      process.env.DATABASE_HOST,
      'localhost',
    ),
  },
});
