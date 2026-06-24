import { create } from "zustand";

export interface PracticeSessionState {
  activityTitle: string;
  afterScore: number | null;
  beforeScore: number | null;
  durationMinutes: number;
  resetPracticeSession: () => void;
  setAfterScore: (score: number) => void;
  setBeforeScore: (score: number) => void;
}

const initialState = {
  activityTitle: "Labor Dance",
  afterScore: 0,
  beforeScore: 0,
  durationMinutes: 30,
};

export const usePracticeSessionStore = create<PracticeSessionState>((set) => ({
  ...initialState,
  resetPracticeSession: () => set(initialState),
  setAfterScore: (score) => set({ afterScore: score }),
  setBeforeScore: (score) => set({ beforeScore: score }),
}));
