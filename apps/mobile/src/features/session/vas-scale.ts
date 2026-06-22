import { diamomTheme } from "@/theme";

export const VAS_SCALE_POINTS = Array.from({ length: 11 }, (_, index) => index);

export type VasCategory =
  | "Tidak Nyeri"
  | "Nyeri Ringan"
  | "Nyeri Sedang"
  | "Nyeri Berat";

export function clampVasScore(score: number): number {
  return Math.max(0, Math.min(10, Math.round(score)));
}

export function getVasCategory(score: number): VasCategory {
  const normalizedScore = clampVasScore(score);

  if (normalizedScore === 0) {
    return "Tidak Nyeri";
  }

  if (normalizedScore <= 3) {
    return "Nyeri Ringan";
  }

  if (normalizedScore <= 6) {
    return "Nyeri Sedang";
  }

  return "Nyeri Berat";
}

export function getVasPointColor(score: number): string {
  const normalizedScore = clampVasScore(score);

  if (normalizedScore <= 2) {
    return diamomTheme.colors.vasLow;
  }

  if (normalizedScore <= 4) {
    return diamomTheme.colors.vasMid;
  }

  if (normalizedScore <= 7) {
    return diamomTheme.colors.vasHigh;
  }

  return diamomTheme.colors.vasSevere;
}

export function getVasScoreSurfaceColor(score: number): string {
  return `${getVasPointColor(score)}40`;
}

export function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.max(totalSeconds % 60, 0)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}
