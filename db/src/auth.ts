import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createDatabaseClient } from './client';

const db = createDatabaseClient();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});
