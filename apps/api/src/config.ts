import { config as loadEnv } from "dotenv";
import { z } from "zod";

loadEnv();

const envSchema = z.object({
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  RESEARCHER_JWT_SECRET: z.string().min(1),
});

export type ApiConfig = z.infer<typeof envSchema>;

let cachedConfig: ApiConfig | null = null;

export function parseApiConfig(env: NodeJS.ProcessEnv): ApiConfig {
  return envSchema.parse(env);
}

export function getApiConfig(): ApiConfig {
  cachedConfig ??= parseApiConfig(process.env);
  return cachedConfig;
}
