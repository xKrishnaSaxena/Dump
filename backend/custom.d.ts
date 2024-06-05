// custom.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    NODE_ENV: string;
    PORT: number;
  }
}
