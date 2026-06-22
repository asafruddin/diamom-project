export interface ResearcherLoginRequest {
  password: string;
  username: string;
}

export interface ResearcherIdentity {
  id: string;
  role: "researcher";
  username: string;
}

export interface ResearcherSession {
  accessToken: string;
  expiresAt: string;
  researcher: ResearcherIdentity;
}

export interface ResearcherLogoutResponse {
  success: true;
}

export interface ParticipantMotherIdentity {
  age: number;
  dilationCm: number;
  gpa: string;
  motherName: string;
  pregnancyWeek: number;
  timestamp: string;
}

export interface ParticipantSafetyScreening {
  hasRisk: boolean;
  signs: string[];
  timestamp: string;
}

export interface ParticipantVasRecord {
  activityTitle: string;
  afterScore: number;
  beforeScore: number;
  durationMinutes?: number;
  id: string;
  motherName?: string;
  savedAt: string;
  status: string;
}

export interface ParticipantSnapshot {
  hasAcceptedDisclaimer: boolean;
  hasResearchConsent: boolean;
  id: string;
  lastSyncedAt: string | null;
  motherIdentity: ParticipantMotherIdentity | null;
  safetyScreening: ParticipantSafetyScreening | null;
  studyId: string | null;
  vasRecords: ParticipantVasRecord[];
}

export interface ParticipantAppSession {
  accessToken: string;
  expiresAt: string;
  participant: ParticipantSnapshot;
}

export interface ParticipantConsentPayload {
  consentedAt: string;
}

export interface ParticipantConsentResponse {
  participant: ParticipantSnapshot;
}

export interface ParticipantSessionRecord {
  activityTitle: string;
  afterScore: number;
  beforeScore: number;
  durationMinutes?: number;
  externalSessionId: string;
  motherName: string;
  recordedAt: string;
  status: string;
}

export interface ParticipantDisclaimerPayload {
  acceptedAt: string;
}

export interface ParticipantProfilePayload {
  age: number;
  dilationCm: number;
  gpa: string;
  motherName: string;
  pregnancyWeek: number;
}

export interface ParticipantSafetyScreeningPayload {
  signs: string[];
}

export interface ParticipantVasRecordPayload {
  activityTitle: string;
  afterScore: number;
  beforeScore: number;
  durationMinutes?: number;
  motherName: string;
  recordedAt: string;
  status: string;
}

export interface ParticipantDeleteResponse {
  success: true;
}

export interface DashboardSummary {
  averageDelta: number;
  averageVasAfter: number;
  averageVasBefore: number;
  totalRespondents: number;
  trendCounts: {
    decrease: number;
    increase: number;
    stable: number;
  };
}

export interface DashboardExportResponse {
  sessions: ParticipantSessionRecord[];
  summary: DashboardSummary;
}
