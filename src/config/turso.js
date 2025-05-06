import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { config, NODE_ENV } from '../config/env.js';

export const db = drizzle({
  connection: {
    url: config.TURSO_DATABASE_URL,
    authToken: config.TURSO_AUTH_TOKEN,
  },
});

const pingConnection = async () => {
  const result = await db.run(sql`SELECT 1;`);
  if (!result.rows.length) {
    console.error('[Database]: Unable to connect Turso');
    process.exit(1);
  }
  console.log(
    `[Database]: ${NODE_ENV === 'development' ? 'Test' : 'Ping'} connection successfully`,
  );
};

export const initializeDb = async () => {
  await pingConnection();
  if (NODE_ENV === 'development') {
    await db.run(sql`PRAGMA foreign_keys = 1;`);
    console.log('[Database]: Foreign keys enabled');
  }
};
