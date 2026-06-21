import { apiConfig } from "./config";
import { seedDefaultResearcher } from "@diamom/db";

await seedDefaultResearcher(apiConfig.DATABASE_URL);
console.log("Seeded default researcher account: admin / admin1234");
