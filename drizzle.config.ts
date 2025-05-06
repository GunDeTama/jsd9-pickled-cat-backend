import { defineConfig } from 'drizzle-kit';
import path from 'path';
import { loadConfig } from './src/config/env';

loadConfig();

const development = process.env.NODE_ENV === 'development'

export default defineConfig({
  casing: 'snake_case',
  dbCredentials: {
    url: development ? `file:///${path.resolve(process.env.TURSO_DATABASE_URL!)}` : process.env.TURSO_DATABASE_URL!,
    authToken: development ? undefined: process.env.TURSO_AUTH_TOKEN  },
  dialect: development ? 'sqlite' : 'turso',
  out: './drizzle/',
  schema: './src/db/schema.js',
});
