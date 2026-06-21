import { getApiConfig } from "./config";
import { seedDefaultResearcher } from "@diamom/db";

const apiConfig = getApiConfig();

await seedDefaultResearcher(apiConfig.DATABASE_URL);
console.log("Seeded default researcher account.");
