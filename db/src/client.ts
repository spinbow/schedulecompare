import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import process from 'node:process';

export function createDatabaseClient(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to create the database client');
  }

  const db = drizzle(databaseUrl);
  return db;
}
