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

export const apiConfig = envSchema.parse(process.env);
