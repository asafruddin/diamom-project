import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "drizzle-kit";

const configDirectory = fileURLToPath(new URL(".", import.meta.url));

try {
  process.loadEnvFile(resolve(configDirectory, "../../apps/api/.env"));
} catch {
  // Allow CI or shell-exported env vars to provide DATABASE_URL instead.
}

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
