import * as v from 'valibot';

console.log(process.env.NODE_ENV);

const envSchema = v.object({
  // Node
  NODE_ENV: v.optional(v.picklist(['development', 'production']), 'production'),

  // Database Connection
  DATABASE_URL: v.string(),

  // Root Email
  ROOT_EMAIL: v.pipe(v.string(), v.email()),

  // Sender Emails
  WELCOME_EMAIL: v.pipe(v.string(), v.email()),

  // TOTP Settings (Period in seconds the code is valid and and max attempts to enter the code)
  TOTP_PERIOD: v.pipe(v.string(), v.transform(Number)),
  TOTP_ATTEMPTS: v.pipe(v.string(), v.transform(Number)),

  // Secrets
  AUTH_SESSION_SECRET: v.string(),
  APP_SESSION_SECRET: v.string(),

  // Email SaaS Tokens
  POSTMARK_TOKEN: v.string(),
  RESEND_TOKEN: v.string(),
});

export const env = v.parse(envSchema, process.env);
