import { createDatabase, seedDefaultResearcher } from "@diamom/db";
import Fastify from "fastify";

import { authPlugin } from "./auth";
import { apiConfig } from "./config";
import { registerRoutes } from "./routes";

export async function createApp() {
  const app = Fastify({
    logger: false,
  });

  const db = createDatabase(apiConfig.DATABASE_URL);

  await seedDefaultResearcher(apiConfig.DATABASE_URL);

  await app.register(authPlugin, {
    db,
    researcherSecret: apiConfig.RESEARCHER_JWT_SECRET,
  });

  await registerRoutes(app, { db });

  return app;
}
