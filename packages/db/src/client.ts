import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import {
  participantAppSessions,
  participantConsents,
  participants,
  researchers,
  researcherSessions,
  syncEvents,
  vasSessions,
} from "./schema";

export function createDatabase(connectionString: string) {
  const queryClient = neon(connectionString);
  return drizzle(queryClient, {
    schema: {
      participantAppSessions,
      participantConsents,
      participants,
      researchers,
      researcherSessions,
      syncEvents,
      vasSessions,
    },
  });
}

export function createId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now()}-${random}`;
}
