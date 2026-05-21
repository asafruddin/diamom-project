
/**
 * Traceability Map
 * Links UI screens to Feature Requirements (FRs), data models, analytics events, and testing.
 */

export interface TraceabilityLink {
  screen: string;
  featureRequirements: string[];
  dataModels: string[];
  analyticsEvents: string[];
  testFiles: string[];
}

export const TRACEABILITY_MAP: Record<string, TraceabilityLink> = {
  onboarding: {
    screen: 'Onboarding Intro',
    featureRequirements: ['FR-01 (User Profile)', 'FR-02 (Safety Check)'],
    dataModels: ['UserProfile', 'SafetyScreening'],
    analyticsEvents: ['onboarding_started'],
    testFiles: ['src/app/onboarding/intro.test.tsx']
  },
  session: {
    screen: 'Guided Session',
    featureRequirements: ['FR-03 (Session Engine)', 'FR-04 (VAS Tracking)'],
    dataModels: ['SessionState', 'VASRecord'],
    analyticsEvents: ['session_started', 'emergency_stop_clicked'],
    testFiles: ['src/features/session/engine.test.ts']
  }
};

export const FUTURE_CMS_MIGRATION_NOTE = `
CMS migration is noted as later-phase work. For MVP, all content is managed locally
via JSON/TS files under src/content/ and governed by the ContentMetadata structure.
`;
