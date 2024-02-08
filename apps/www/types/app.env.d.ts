declare namespace NodeJS {
  export interface ProcessEnv {
    THEME_SESSION_SECRET: string;
    AUTH_SESSION_SECRET: string;
    AUTH_ENCRYPTION_SECRET: string;
  }
}
