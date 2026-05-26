import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { clampVasScore } from "./vas-scale";

export type VasHistoryRecord = {
  activityTitle: string;
  afterScore: number;
  beforeScore: number;
  id: string;
  savedAt: string;
};

type CreateVasHistoryRecordInput = {
  activityTitle?: string;
  afterScore: number;
  beforeScore: number;
  id?: string;
  savedAt?: string;
};

export interface VasHistoryState {
  records: VasHistoryRecord[];
  addRecord: (input: CreateVasHistoryRecordInput) => VasHistoryRecord;
  clearRecords: () => void;
}

export function createVasHistoryRecord(
  input: CreateVasHistoryRecordInput,
): VasHistoryRecord {
  const savedAt = input.savedAt ?? new Date().toISOString();
  return {
    activityTitle: input.activityTitle ?? "Labor Dance",
    afterScore: clampVasScore(input.afterScore),
    beforeScore: clampVasScore(input.beforeScore),
    id: input.id ?? `vas-${savedAt}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt,
  };
}

export const useVasHistoryStore = create<VasHistoryState>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (input) => {
        const record = createVasHistoryRecord(input);
        set((state) => ({
          records: [record, ...state.records],
        }));
        return record;
      },
      clearRecords: () => set({ records: [] }),
    }),
    {
      name: "diamom-vas-history-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
