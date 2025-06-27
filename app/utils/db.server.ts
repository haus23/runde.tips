import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from './env.server';

export const db = drizzle(env.DATABASE_URL, { casing: 'snake_case' });
