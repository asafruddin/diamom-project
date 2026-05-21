import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SafetyScreeningAnswers {
  signs: string[];
  timestamp: string;
  hasRisk: boolean;
}

// DiaMom is fully anonymous — no user profile, login, or registration.
// Only onboarding consent and safety screening state is persisted.
export interface OnboardingState {
  hasAcceptedDisclaimer: boolean;
  hasCompletedSafetyScreening: boolean;
  safetyScreening: SafetyScreeningAnswers | null;
  acceptDisclaimer: () => void;
  saveSafetyScreening: (signs: string[]) => void;
  clearOnboardingData: () => void;
}

export const useProfileStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasAcceptedDisclaimer: false,
      hasCompletedSafetyScreening: false,
      safetyScreening: null,
      acceptDisclaimer: () => set({ hasAcceptedDisclaimer: true }),
      saveSafetyScreening: (signs) => {
        const hasRisk = signs.length > 0;
        set({
          safetyScreening: {
            signs,
            timestamp: new Date().toISOString(),
            hasRisk,
          },
          hasCompletedSafetyScreening: true,
        });
      },
      clearOnboardingData: () =>
        set({
          hasAcceptedDisclaimer: false,
          hasCompletedSafetyScreening: false,
          safetyScreening: null,
        }),
    }),
    {
      name: "diamom-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
