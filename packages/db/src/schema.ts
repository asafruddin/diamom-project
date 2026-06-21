import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const researchers = pgTable("researchers", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("researcher"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const researcherSessions = pgTable("researcher_sessions", {
  id: text("id").primaryKey(),
  researcherId: text("researcher_id")
    .notNull()
    .references(() => researchers.id, { onDelete: "cascade" }),
  tokenId: text("token_id").notNull().unique(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

export const participants = pgTable("participants", {
  id: text("id").primaryKey(),
  studyId: text("study_id").unique(),
  motherName: text("mother_name"),
  age: integer("age"),
  dilationCm: integer("dilation_cm"),
  gpa: text("gpa"),
  pregnancyWeek: integer("pregnancy_week"),
  disclaimerAcceptedAt: timestamp("disclaimer_accepted_at", {
    withTimezone: true,
  }),
  safetySigns: jsonb("safety_signs").$type<string[]>(),
  safetyHasRisk: boolean("safety_has_risk"),
  safetyRecordedAt: timestamp("safety_recorded_at", { withTimezone: true }),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const participantAppSessions = pgTable("participant_app_sessions", {
  id: text("id").primaryKey(),
  participantId: text("participant_id")
    .notNull()
    .references(() => participants.id, { onDelete: "cascade" }),
  tokenId: text("token_id").notNull().unique(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

export const participantConsents = pgTable("participant_consents", {
  id: text("id").primaryKey(),
  participantId: text("participant_id")
    .notNull()
    .references(() => participants.id, { onDelete: "cascade" }),
  consentedAt: timestamp("consented_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const vasSessions = pgTable(
  "vas_sessions",
  {
    id: text("id").primaryKey(),
    participantId: text("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
    externalSessionId: text("external_session_id").notNull(),
    activityTitle: text("activity_title").notNull(),
    beforeScore: integer("before_score").notNull(),
    afterScore: integer("after_score").notNull(),
    durationMinutes: integer("duration_minutes"),
    motherName: text("mother_name").notNull(),
    status: text("status").notNull(),
    recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    participantExternalSessionIdx: uniqueIndex(
      "vas_sessions_participant_external_session_idx",
    ).on(table.participantId, table.externalSessionId),
  }),
);

export const syncEvents = pgTable("sync_events", {
  id: text("id").primaryKey(),
  participantId: text("participant_id")
    .notNull()
    .references(() => participants.id, { onDelete: "cascade" }),
  syncType: text("sync_type").notNull(),
  status: text("status").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
