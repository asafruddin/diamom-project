import type {
  DashboardSummary,
  ParticipantConsentPayload,
  ParticipantSafetyScreeningPayload,
  ParticipantSessionRecord,
  ParticipantSnapshot,
  ParticipantVasRecord,
  ParticipantVasRecordPayload,
} from "@diamom/contracts";
import { and, desc, eq, isNull } from "drizzle-orm";

import { buildDashboardSummary } from "./dashboard";
import { createDatabase, createId } from "./client";
import {
  participantAppSessions,
  participantConsents,
  participants,
  researchers,
  researcherSessions,
  syncEvents,
  vasSessions,
} from "./schema";

export * from "./dashboard";
export * from "./client";
export * from "./schema";
export * from "./seed-default-researcher";

type Database = ReturnType<typeof createDatabase>;

function mapVasRecord(
  row: typeof vasSessions.$inferSelect,
): ParticipantVasRecord {
  return {
    activityTitle: row.activityTitle,
    afterScore: row.afterScore,
    beforeScore: row.beforeScore,
    durationMinutes: row.durationMinutes ?? undefined,
    id: row.id,
    motherName: row.motherName,
    savedAt: row.recordedAt.toISOString(),
    status: row.status,
  };
}

async function updateParticipantTimestamp(
  db: Database,
  participantId: string,
) {
  await db
    .update(participants)
    .set({ lastSyncedAt: new Date() })
    .where(eq(participants.id, participantId));
}

export async function createParticipant(db: Database) {
  return (
    await db
      .insert(participants)
      .values({
        id: createId("participant"),
        lastSyncedAt: new Date(),
      })
      .returning()
  )[0];
}

export async function getParticipantById(
  db: Database,
  participantId: string,
) {
  return db.query.participants.findFirst({
    where: eq(participants.id, participantId),
  });
}

export async function getParticipantSnapshot(
  db: Database,
  participantId: string,
): Promise<ParticipantSnapshot> {
  const participant = await getParticipantById(db, participantId);

  if (!participant) {
    throw new Error("Peserta tidak ditemukan.");
  }

  const latestConsent = await db.query.participantConsents.findFirst({
    where: eq(participantConsents.participantId, participantId),
    orderBy: desc(participantConsents.consentedAt),
  });

  const sessionRows = await db.query.vasSessions.findMany({
    where: eq(vasSessions.participantId, participantId),
    orderBy: desc(vasSessions.recordedAt),
  });

  return {
    hasAcceptedDisclaimer: !!participant.disclaimerAcceptedAt,
    hasResearchConsent: !!latestConsent,
    id: participant.id,
    lastSyncedAt: participant.lastSyncedAt?.toISOString() ?? null,
    motherIdentity:
      participant.age !== null &&
      participant.age !== undefined &&
      participant.dilationCm !== null &&
      participant.dilationCm !== undefined &&
      participant.gpa &&
      participant.motherName &&
      participant.pregnancyWeek !== null &&
      participant.pregnancyWeek !== undefined
        ? {
            age: participant.age,
            dilationCm: participant.dilationCm,
            gpa: participant.gpa,
            motherName: participant.motherName,
            pregnancyWeek: participant.pregnancyWeek,
            timestamp:
              participant.lastSyncedAt?.toISOString() ??
              participant.createdAt.toISOString(),
          }
        : null,
    safetyScreening: participant.safetyRecordedAt
      ? {
          hasRisk: !!participant.safetyHasRisk,
          signs: participant.safetySigns ?? [],
          timestamp: participant.safetyRecordedAt.toISOString(),
        }
      : null,
    studyId: participant.studyId ?? null,
    vasRecords: sessionRows.map(mapVasRecord),
  };
}

export async function createParticipantAppSession(
  db: Database,
  participantId: string,
  tokenId: string,
  expiresAt: Date,
) {
  await db.insert(participantAppSessions).values({
    expiresAt,
    id: createId("participant-app-session"),
    issuedAt: new Date(),
    participantId,
    tokenId,
  });
}

export async function getActiveParticipantAppSession(
  db: Database,
  tokenId: string,
) {
  return db.query.participantAppSessions.findFirst({
    where: and(
      eq(participantAppSessions.tokenId, tokenId),
      isNull(participantAppSessions.revokedAt),
    ),
    orderBy: desc(participantAppSessions.issuedAt),
  });
}

export async function acceptParticipantDisclaimer(
  db: Database,
  participantId: string,
  acceptedAt: string,
) {
  await db
    .update(participants)
    .set({
      disclaimerAcceptedAt: new Date(acceptedAt),
      lastSyncedAt: new Date(),
    })
    .where(eq(participants.id, participantId));

  return getParticipantSnapshot(db, participantId);
}

export async function saveParticipantIdentity(
  db: Database,
  participantId: string,
  payload: {
    age: number;
    dilationCm: number;
    gpa: string;
    motherName: string;
    pregnancyWeek: number;
  },
) {
  await db
    .update(participants)
    .set({
      age: payload.age,
      dilationCm: payload.dilationCm,
      gpa: payload.gpa,
      lastSyncedAt: new Date(),
      motherName: payload.motherName,
      pregnancyWeek: payload.pregnancyWeek,
    })
    .where(eq(participants.id, participantId));

  return getParticipantSnapshot(db, participantId);
}

export async function saveParticipantSafetyScreening(
  db: Database,
  participantId: string,
  payload: ParticipantSafetyScreeningPayload & { hasRisk: boolean },
) {
  await db
    .update(participants)
    .set({
      lastSyncedAt: new Date(),
      safetyHasRisk: payload.hasRisk,
      safetyRecordedAt: new Date(),
      safetySigns: payload.signs,
    })
    .where(eq(participants.id, participantId));

  return getParticipantSnapshot(db, participantId);
}

export async function createParticipantVasRecord(
  db: Database,
  participantId: string,
  payload: ParticipantVasRecordPayload,
) {
  const recordId = createId("vas-session");

  await db.insert(vasSessions).values({
    activityTitle: payload.activityTitle,
    afterScore: payload.afterScore,
    beforeScore: payload.beforeScore,
    durationMinutes: payload.durationMinutes,
    externalSessionId: recordId,
    id: recordId,
    motherName: payload.motherName,
    participantId,
    recordedAt: new Date(payload.recordedAt),
    status: payload.status,
  });

  await db.insert(syncEvents).values({
    id: createId("sync"),
    message: "participant-session-saved",
    participantId,
    status: "completed",
    syncType: "participant-session-save",
  });

  await updateParticipantTimestamp(db, participantId);

  return getParticipantSnapshot(db, participantId);
}

export async function clearParticipantData(
  db: Database,
  participantId: string,
) {
  await db.delete(participants).where(eq(participants.id, participantId));
}

export async function grantParticipantConsent(
  db: Database,
  participantId: string,
  payload: ParticipantConsentPayload,
) {
  const participant = await getParticipantById(db, participantId);

  if (!participant) {
    throw new Error("Peserta tidak ditemukan.");
  }

  const studyId = participant.studyId ?? createId("study");

  if (!participant.motherName) {
    throw new Error("Isi identitas ibu terlebih dahulu sebelum memberi persetujuan penelitian.");
  }

  await db
    .update(participants)
    .set({
      lastSyncedAt: new Date(),
      studyId,
    })
    .where(eq(participants.id, participantId));

  const existingConsent = await db.query.participantConsents.findFirst({
    where: eq(participantConsents.participantId, participantId),
    orderBy: desc(participantConsents.consentedAt),
  });

  if (!existingConsent) {
    await db.insert(participantConsents).values({
      consentedAt: new Date(payload.consentedAt),
      id: createId("consent"),
      participantId,
    });
  }

  return getParticipantSnapshot(db, participantId);
}

export async function getResearcherByUsername(
  db: Database,
  username: string,
) {
  return db.query.researchers.findFirst({
    where: eq(researchers.username, username),
  });
}

export async function createResearcherSession(
  db: Database,
  researcherId: string,
  tokenId: string,
  expiresAt: Date,
) {
  await db.insert(researcherSessions).values({
    expiresAt,
    id: createId("researcher-session"),
    issuedAt: new Date(),
    researcherId,
    tokenId,
  });
}

export async function revokeResearcherSession(
  db: Database,
  tokenId: string,
) {
  await db
    .update(researcherSessions)
    .set({ revokedAt: new Date() })
    .where(eq(researcherSessions.tokenId, tokenId));
}

export async function getActiveResearcherSession(
  db: Database,
  tokenId: string,
) {
  return db.query.researcherSessions.findFirst({
    where: and(
      eq(researcherSessions.tokenId, tokenId),
      isNull(researcherSessions.revokedAt),
    ),
    orderBy: desc(researcherSessions.issuedAt),
  });
}

export async function getDashboardSummary(
  db: Database,
): Promise<DashboardSummary> {
  const consentRows = await db.query.participantConsents.findMany();
  const consentedParticipantIds = new Set(
    consentRows.map((row) => row.participantId),
  );
  const sessionRows = await db.query.vasSessions.findMany({
    orderBy: desc(vasSessions.recordedAt),
  });

  const sessions: ParticipantSessionRecord[] = sessionRows
    .filter((row) => consentedParticipantIds.has(row.participantId))
    .map((row) => ({
      activityTitle: row.activityTitle,
      afterScore: row.afterScore,
      beforeScore: row.beforeScore,
      durationMinutes: row.durationMinutes ?? undefined,
      externalSessionId: row.externalSessionId,
      motherName: row.motherName,
      recordedAt: row.recordedAt.toISOString(),
      status: row.status,
    }));

  return buildDashboardSummary(consentedParticipantIds.size, sessions);
}
