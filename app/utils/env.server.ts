import * as v from 'valibot';

const envSchema = v.object({
  // Basics
  NODE_ENV: v.optional(v.picklist(['development', 'production'])),

  // Prisma Connection
  DATABASE_URL: v.string(),

  // Secrets
  SESSION_SECRET: v.string(),
  AUTH_SESSION_SECRET: v.string(),

  // Email SaaS Tokens
  POSTMARK_TOKEN: v.string(),
  RESEND_TOKEN: v.string(),

  // Firebase Credentials
  FIREBASE_PROJECT_ID: v.string(),
  FIREBASE_CLIENT_EMAIL: v.string(),
  FIREBASE_PRIVATE_KEY: v.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends v.InferInput<typeof envSchema> {}
  }
}

export function ensureEnvironment() {
  const result = v.safeParse(envSchema, process.env);

  if (!result.success) {
    console.error(
      `Invalid environment variable '${
        result.issues[0].path ? result.issues[0].path[0].key : ''
      }', Error: ${result.issues.at(0)?.message}`,
    );

    throw new Error('Invalid enviroment variables');
  }
}
