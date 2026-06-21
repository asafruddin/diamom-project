import bcrypt from "bcryptjs";

import { createDatabase, createId } from "./client.js";
import { researchers } from "./schema.js";

export async function seedDefaultResearcher(connectionString: string) {
  const db = createDatabase(connectionString);
  const existing = await db.query.researchers.findFirst({
    where: (table, { eq }) => eq(table.username, "admin"),
  });

  if (existing) {
    return existing;
  }

  const passwordHash = await bcrypt.hash("admin1234", 10);

  const [researcher] = await db
    .insert(researchers)
    .values({
      id: createId("researcher"),
      passwordHash,
      role: "researcher",
      username: "admin",
    })
    .returning();

  return researcher;
}
