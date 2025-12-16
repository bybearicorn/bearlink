export interface AppConfig {
  NODE_ENV: string;
  PORT: string;
  DISABLE_JOBS: string;
  DB_HOST?: string;
  DB_PORT?: number;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_DATABASE?: string;
  DB_SCHEMA?: string;
  DB_CA?: string;
}

export const CONFIG_DEFAULT: AppConfig = {
  NODE_ENV: "PRODUCTION",
  PORT: "6003",
  DISABLE_JOBS: "false",
  DB_SCHEMA: "public",
};
