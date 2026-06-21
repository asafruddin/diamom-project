import type { IncomingMessage, ServerResponse } from "node:http";

import { createApp } from "../src/app";

let app: Awaited<ReturnType<typeof createApp>> | null = null;

async function getApp() {
  if (!app) {
    app = await createApp();
    await app.ready();
  }
  return app;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const fastify = await getApp();
  fastify.server.emit("request", req, res);
}
