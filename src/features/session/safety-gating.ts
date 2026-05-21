
import { SAFETY_GATING_MESSAGES } from '@/constants/safety';
import { SafetyScreeningAnswers } from '@/features/onboarding/profile-store';

export type GatingDecision = 'allow' | 'block';

export interface GatingResult {
  decision: GatingDecision;
  message: string;
  canAccessEducation: boolean;
}

/**
 * Evaluates the user's safety screening answers to determine if they can
 * access guided physical activity sessions.
 */
export const evaluateSafetyScreening = (answers: SafetyScreeningAnswers | null): GatingResult => {
  if (!answers) {
    return {
      decision: 'block',
      message: 'Anda harus menyelesaikan skrining keamanan terlebih dahulu.',
      canAccessEducation: true,
    };
  }

  if (answers.hasRisk) {
    return {
      decision: 'block',
      message: SAFETY_GATING_MESSAGES.RISK_FOUND,
      canAccessEducation: true,
    };
  }

  return {
    decision: 'allow',
    message: SAFETY_GATING_MESSAGES.SAFE,
    canAccessEducation: true,
  };
};
