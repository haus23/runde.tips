import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as relations from '~/db/relations';
import * as schema from '~/db/schema';

import { env } from './env.server';

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle({
  client,
  schema: { ...schema, ...relations },
  casing: 'snake_case',
});
