declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    AUTH_ENCRYPTION_SECRET: string;
    POSTMARK_TOKEN: string;

    // MIGRATION: Firebase
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
  }
}
