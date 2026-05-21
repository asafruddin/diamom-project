
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  pregnancyWeek?: string;
  estimatedDueDate?: string;
  isFirstPregnancy?: boolean;
  hasProviderApproval?: boolean;
}

export interface SafetyScreeningAnswers {
  signs: string[];
  timestamp: string;
  hasRisk: boolean;
}

export interface ProfileState {
  profile: Partial<UserProfile> | null;
  hasCompletedProfile: boolean;
  hasAcceptedDisclaimer: boolean;
  hasCompletedSafetyScreening: boolean;
  safetyScreening: SafetyScreeningAnswers | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  acceptDisclaimer: () => void;
  saveSafetyScreening: (signs: string[]) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      hasCompletedProfile: false,
      hasAcceptedDisclaimer: false,
      hasCompletedSafetyScreening: false,
      safetyScreening: null,
      updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
      completeOnboarding: () => set({ hasCompletedProfile: true }),
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
      clearProfile: () => set({ profile: null, hasCompletedProfile: false, hasAcceptedDisclaimer: false, hasCompletedSafetyScreening: false, safetyScreening: null }),
    }),
    {
      name: 'diamom-profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
