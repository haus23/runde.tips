declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    AUTH_ENCRYPTION_SECRET: string;
  }
}
