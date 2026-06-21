import { clampVasScore } from "./vas-scale";

export type VasHistoryRecord = {
  activityTitle: string;
  afterScore: number;
  beforeScore: number;
  durationMinutes?: number;
  id: string;
  motherName?: string;
  savedAt: string;
  status: string;
};

export type CreateVasHistoryRecordInput = {
  activityTitle?: string;
  afterScore: number;
  beforeScore: number;
  durationMinutes?: number;
  id?: string;
  motherName?: string;
  savedAt?: string;
  status?: string;
};

export function createVasHistoryRecord(
  input: CreateVasHistoryRecordInput,
): VasHistoryRecord {
  const savedAt = input.savedAt ?? new Date().toISOString();

  return {
    activityTitle: input.activityTitle ?? "Labor Dance",
    afterScore: clampVasScore(input.afterScore),
    beforeScore: clampVasScore(input.beforeScore),
    durationMinutes: input.durationMinutes,
    id: input.id ?? `vas-${savedAt}-${Math.random().toString(36).slice(2, 8)}`,
    motherName: input.motherName,
    savedAt,
    status: input.status ?? "Intervensi Selesai",
  };
}
