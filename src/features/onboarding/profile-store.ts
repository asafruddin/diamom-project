import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SafetyScreeningAnswers {
  signs: string[];
  timestamp: string;
  hasRisk: boolean;
}

export interface MotherIdentity {
  age: number;
  dilationCm: number;
  gpa: string;
  motherName: string;
  pregnancyWeek: number;
  timestamp: string;
}

// Mother identity is sensitive MVP data and must stay local-only.
export interface OnboardingState {
  hasAcceptedDisclaimer: boolean;
  hasCompletedMotherIdentity: boolean;
  hasCompletedSafetyScreening: boolean;
  motherIdentity: MotherIdentity | null;
  safetyScreening: SafetyScreeningAnswers | null;
  acceptDisclaimer: () => void;
  saveMotherIdentity: (
    identity: Omit<MotherIdentity, "timestamp">,
  ) => void;
  updatePregnancyProgress: (progress: {
    dilationCm: number;
    pregnancyWeek: number;
  }) => void;
  saveSafetyScreening: (signs: string[]) => void;
  clearOnboardingData: () => void;
}

export const useProfileStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasAcceptedDisclaimer: false,
      hasCompletedMotherIdentity: false,
      hasCompletedSafetyScreening: false,
      motherIdentity: null,
      safetyScreening: null,
      acceptDisclaimer: () => set({ hasAcceptedDisclaimer: true }),
      saveMotherIdentity: (identity) =>
        set({
          hasCompletedMotherIdentity: true,
          motherIdentity: {
            ...identity,
            timestamp: new Date().toISOString(),
          },
        }),
      updatePregnancyProgress: (progress) =>
        set((state) => {
          if (!state.motherIdentity) {
            return state;
          }

          return {
            motherIdentity: {
              ...state.motherIdentity,
              ...progress,
              timestamp: new Date().toISOString(),
            },
          };
        }),
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
          hasCompletedMotherIdentity: false,
          hasCompletedSafetyScreening: false,
          motherIdentity: null,
          safetyScreening: null,
        }),
    }),
    {
      name: "diamom-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
