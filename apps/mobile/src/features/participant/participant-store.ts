import type {
  ParticipantSessionRecord,
  ParticipantSnapshot,
} from "@diamom/contracts";
import { create } from "zustand";

import { deriveSafetyScreeningRisk } from "@/features/onboarding/safety-screening";
import {
  deleteParticipantAppToken,
  readParticipantAppToken,
  saveParticipantAppToken,
} from "@/features/research/research-secure-store";
import {
  type CreateVasHistoryRecordInput,
  createVasHistoryRecord,
  type VasHistoryRecord,
} from "@/features/session/vas-history-record";

import {
  bootstrapParticipantApp,
  deleteParticipantAccount,
  fetchParticipantSnapshot,
  saveParticipantDisclaimer,
  saveParticipantProfile,
  saveParticipantResearchConsent,
  saveParticipantSafetyScreening,
  saveParticipantVasRecord,
} from "./participant-api";

export interface SafetyScreeningAnswers {
  hasRisk: boolean;
  signs: string[];
  timestamp: string;
}

export interface MotherIdentity {
  age: number;
  dilationCm: number;
  gpa: string;
  motherName: string;
  pregnancyWeek: number;
  timestamp: string;
}

function mapSnapshot(snapshot: ParticipantSnapshot) {
  return {
    hasAcceptedDisclaimer: snapshot.hasAcceptedDisclaimer,
    hasCompletedMotherIdentity: !!snapshot.motherIdentity,
    hasCompletedSafetyScreening: !!snapshot.safetyScreening,
    hasResearchConsent: snapshot.hasResearchConsent,
    lastSyncError: null,
    lastSyncedAt: snapshot.lastSyncedAt,
    motherIdentity: snapshot.motherIdentity,
    participantId: snapshot.id,
    pendingSessions: [] as ParticipantSessionRecord[],
    records: snapshot.vasRecords,
    safetyScreening: snapshot.safetyScreening,
    studyId: snapshot.studyId,
  };
}

type ParticipantDataState = {
  acceptDisclaimer: () => Promise<void>;
  addRecord: (input: CreateVasHistoryRecordInput) => Promise<VasHistoryRecord>;
  clearOnboardingData: () => Promise<void>;
  clearRecords: () => Promise<void>;
  deleteParticipantData: () => Promise<void>;
  enqueueSession: (session: ParticipantSessionRecord) => void;
  grantConsent: () => Promise<void>;
  hasAcceptedDisclaimer: boolean;
  hasCompletedMotherIdentity: boolean;
  hasCompletedSafetyScreening: boolean;
  hasResearchConsent: boolean;
  hydrate: () => Promise<void>;
  isHydrated: boolean;
  isHydrating: boolean;
  lastSyncError: string | null;
  lastSyncedAt: string | null;
  markSessionsProcessed: (sessionIds: string[]) => void;
  motherIdentity: MotherIdentity | null;
  participantId: string | null;
  participantToken: string | null;
  pendingSessions: ParticipantSessionRecord[];
  records: VasHistoryRecord[];
  resetResearchSync: () => Promise<void>;
  safetyScreening: SafetyScreeningAnswers | null;
  saveMotherIdentity: (
    identity: Omit<MotherIdentity, "timestamp">,
  ) => Promise<void>;
  saveSafetyScreening: (signs: string[]) => Promise<void>;
  setLastSyncError: (message: string | null) => void;
  setLastSyncedAt: (value: string | null) => void;
  studyId: string | null;
  updatePregnancyProgress: (progress: {
    dilationCm: number;
    pregnancyWeek: number;
  }) => Promise<void>;
};

async function ensureParticipantToken(
  getState: () => ParticipantDataState,
): Promise<string> {
  const currentToken = getState().participantToken;

  if (currentToken) {
    return currentToken;
  }

  await getState().hydrate();

  const refreshedToken = getState().participantToken;

  if (!refreshedToken) {
    throw new Error("Sesi peserta belum siap.");
  }

  return refreshedToken;
}

export const useParticipantStore = create<ParticipantDataState>((set, get) => ({
  acceptDisclaimer: async () => {
    const token = await ensureParticipantToken(get);
    const snapshot = await saveParticipantDisclaimer(token, {
      acceptedAt: new Date().toISOString(),
    });

    set(mapSnapshot(snapshot));
  },
  addRecord: async (input) => {
    const token = await ensureParticipantToken(get);
    const record = createVasHistoryRecord(input);
    const snapshot = await saveParticipantVasRecord(token, {
      activityTitle: record.activityTitle,
      afterScore: record.afterScore,
      beforeScore: record.beforeScore,
      durationMinutes: record.durationMinutes,
      motherName: record.motherName ?? get().motherIdentity?.motherName ?? "Ibu",
      recordedAt: record.savedAt,
      status: record.status,
    });

    set(mapSnapshot(snapshot));

    return snapshot.vasRecords[0] ?? record;
  },
  clearOnboardingData: async () => {
    await get().deleteParticipantData();
  },
  clearRecords: async () => {
    await get().deleteParticipantData();
  },
  deleteParticipantData: async () => {
    const token = get().participantToken;

    if (token) {
      await deleteParticipantAccount(token);
    }

    await deleteParticipantAppToken();

    set({
      hasAcceptedDisclaimer: false,
      hasCompletedMotherIdentity: false,
      hasCompletedSafetyScreening: false,
      hasResearchConsent: false,
      isHydrated: false,
      isHydrating: false,
      lastSyncError: null,
      lastSyncedAt: null,
      motherIdentity: null,
      participantId: null,
      participantToken: null,
      pendingSessions: [],
      records: [],
      safetyScreening: null,
      studyId: null,
    });
  },
  enqueueSession: (session) =>
    set((state) => ({
      pendingSessions: [...state.pendingSessions, session],
    })),
  grantConsent: async () => {
    const token = await ensureParticipantToken(get);
    const response = await saveParticipantResearchConsent(token, {
      consentedAt: new Date().toISOString(),
    });

    set(mapSnapshot(response.participant));
  },
  hasAcceptedDisclaimer: false,
  hasCompletedMotherIdentity: false,
  hasCompletedSafetyScreening: false,
  hasResearchConsent: false,
  hydrate: async () => {
    if (get().isHydrating) {
      return;
    }

    set({ isHydrating: true, lastSyncError: null });

    try {
      const savedToken = await readParticipantAppToken();

      if (savedToken) {
        try {
          const snapshot = await fetchParticipantSnapshot(savedToken);
          set({
            ...mapSnapshot(snapshot),
            isHydrated: true,
            isHydrating: false,
            participantToken: savedToken,
          });
          return;
        } catch {
          await deleteParticipantAppToken();
        }
      }

      const session = await bootstrapParticipantApp();
      await saveParticipantAppToken(session.accessToken);

      set({
        ...mapSnapshot(session.participant),
        isHydrated: true,
        isHydrating: false,
        participantToken: session.accessToken,
      });
    } catch (error) {
      set({
        isHydrated: true,
        isHydrating: false,
        lastSyncError:
          error instanceof Error
            ? error.message
            : "Gagal memuat data peserta dari server.",
      });
    }
  },
  isHydrated: false,
  isHydrating: false,
  lastSyncError: null,
  lastSyncedAt: null,
  markSessionsProcessed: (sessionIds) =>
    set((state) => ({
      pendingSessions: state.pendingSessions.filter(
        (session) => !sessionIds.includes(session.externalSessionId),
      ),
    })),
  motherIdentity: null,
  participantId: null,
  participantToken: null,
  pendingSessions: [],
  records: [],
  resetResearchSync: async () => {
    const token = get().participantToken;

    if (!token) {
      return;
    }

    const snapshot = await fetchParticipantSnapshot(token);
    set(mapSnapshot(snapshot));
  },
  safetyScreening: null,
  saveMotherIdentity: async (identity) => {
    const token = await ensureParticipantToken(get);
    const snapshot = await saveParticipantProfile(token, identity);

    set(mapSnapshot(snapshot));
  },
  saveSafetyScreening: async (signs) => {
    const token = await ensureParticipantToken(get);
    const normalizedSigns = Array.from(new Set(signs));
    const snapshot = await saveParticipantSafetyScreening(token, {
      signs: normalizedSigns,
    });

    set({
      ...mapSnapshot(snapshot),
      safetyScreening: {
        hasRisk: deriveSafetyScreeningRisk(normalizedSigns),
        signs: normalizedSigns,
        timestamp: snapshot.safetyScreening?.timestamp ?? new Date().toISOString(),
      },
    });
  },
  setLastSyncError: (message) => set({ lastSyncError: message }),
  setLastSyncedAt: (value) => set({ lastSyncedAt: value }),
  studyId: null,
  updatePregnancyProgress: async (progress) => {
    const motherIdentity = get().motherIdentity;

    if (!motherIdentity) {
      throw new Error("Identitas ibu belum tersedia.");
    }

    await get().saveMotherIdentity({
      age: motherIdentity.age,
      dilationCm: progress.dilationCm,
      gpa: motherIdentity.gpa,
      motherName: motherIdentity.motherName,
      pregnancyWeek: progress.pregnancyWeek,
    });
  },
}));
