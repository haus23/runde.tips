import { z } from 'zod';

const envSchema = z.object({
  // Basics
  NODE_ENV: z.enum(['development', 'production']).optional(),
  DATABASE_URL: z.string().endsWith('?connection_limit=1'),

  // Secrets
  SESSION_SECRET: z.string(),
  AUTH_ENCRYPTION_SECRET: z.string(),

  // Email SaaS Tokens
  POSTMARK_TOKEN: z.string(),
  RESEND_TOKEN: z.string(),

  // MIGRATION: Firebase
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    `Invalid environment variable '${
      result.error.issues.at(0)?.path
    }', Error: ${result.error.issues.at(0)?.message}`,
  );

  throw new Error('Invalid enviroment variables');
}
