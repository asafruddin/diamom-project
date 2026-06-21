import { SAFETY_SCREENING_INDICATORS } from "@/constants/safety";

export type SafetyIndicatorSelection = Record<string, boolean>;

const requiredIndicatorIds = SAFETY_SCREENING_INDICATORS.map(
  (indicator) => indicator.id,
);

export const getSelectedSafetyIndicatorIds = (
  selectedIndicators: SafetyIndicatorSelection,
): string[] =>
  SAFETY_SCREENING_INDICATORS.filter(
    (indicator) => selectedIndicators[indicator.id],
  ).map((indicator) => indicator.id);

export const hasCompletedSafetyScreening = (
  selectedIndicatorIds: string[],
): boolean => {
  const selectedIds = new Set(selectedIndicatorIds);

  return requiredIndicatorIds.every((indicatorId) =>
    selectedIds.has(indicatorId),
  );
};

export const deriveSafetyScreeningRisk = (
  selectedIndicatorIds: string[],
): boolean => !hasCompletedSafetyScreening(selectedIndicatorIds);
