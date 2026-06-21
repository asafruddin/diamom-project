import { getApiConfig } from "./config";
import { createApp } from "./app";

const apiConfig = getApiConfig();
const app = await createApp();

await app.listen({
  host: apiConfig.API_HOST,
  port: apiConfig.API_PORT,
});

console.log(`🚀 Server listening on http://${apiConfig.API_HOST}:${apiConfig.API_PORT}`);
