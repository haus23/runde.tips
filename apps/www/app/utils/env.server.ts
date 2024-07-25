import {
  type InferInput,
  object,
  optional,
  picklist,
  safeParse,
  string,
} from 'valibot';

const envSchema = object({
  // Basics
  NODE_ENV: optional(picklist(['development', 'production'])),

  // Prisma Connection
  DATABASE_URL: string(),

  // Secrets
  SESSION_SECRET: string(),
  AUTH_SESSION_SECRET: string(),

  // Email SaaS Tokens
  POSTMARK_TOKEN: string(),
  RESEND_TOKEN: string(),

  // Firebase Credentials
  FIREBASE_PROJECT_ID: string(),
  FIREBASE_CLIENT_EMAIL: string(),
  FIREBASE_PRIVATE_KEY: string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends InferInput<typeof envSchema> {}
  }
}

export function ensureEnvironment() {
  const result = safeParse(envSchema, process.env);

  if (!result.success) {
    console.error(
      `Invalid environment variable '${
        result.issues[0].path ? result.issues[0].path[0].key : ''
      }', Error: ${result.issues.at(0)?.message}`,
    );

    throw new Error('Invalid enviroment variables');
  }
}
