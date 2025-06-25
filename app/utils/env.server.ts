import * as v from 'valibot';

const envSchema = v.object({
  // Node
  NODE_ENV: v.optional(
    v.picklist(['development', 'production']),
    'development',
  ),

  // Root Email
  ROOT_EMAIL: v.pipe(v.string(), v.email()),
});

export const env = v.parse(envSchema, process.env);
