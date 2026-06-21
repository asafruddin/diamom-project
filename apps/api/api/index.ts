import type { IncomingMessage, ServerResponse } from "node:http";

type CreateApp = typeof import("../src/app").createApp;
type ApiApp = Awaited<ReturnType<CreateApp>>;

let app: ApiApp | null = null;
let appPromise: Promise<ApiApp> | null = null;

async function getApp() {
  if (!app) {
    if (!appPromise) {
      appPromise = (async () => {
        const { createApp } = await import("../src/app");
        const instance = await createApp();
        await instance.ready();
        return instance;
      })();
    }

    app = await appPromise;
  }
  return app;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const fastify = await getApp();
    fastify.server.emit("request", req, res);
  } catch (error) {
    console.error("Vercel function bootstrap failed", error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ message: "Backend failed to start." }));
      return;
    }

    res.end();
  }
}
