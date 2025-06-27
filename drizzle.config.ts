import type { Config } from 'drizzle-kit';

import * as v from 'valibot';

const localEnvSchema = v.object({
  DATABASE_URL: v.string(),
});

const env = v.parse(localEnvSchema, process.env);

export default {
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: './database/schema.ts',
  casing: 'snake_case',
} satisfies Config;
