import assert from "node:assert";
import test from "node:test";

import { SAFETY_SCREENING_INDICATORS } from "@/constants/safety";

import {
  deriveSafetyScreeningRisk,
  getSelectedSafetyIndicatorIds,
  hasCompletedSafetyScreening,
} from "./safety-screening";

test("getSelectedSafetyIndicatorIds returns checked indicators in display order", () => {
  const selectedIndicatorIds = getSelectedSafetyIndicatorIds({
    can_stand: true,
    has_companion: true,
    no_bleeding: true,
  });

  assert.deepStrictEqual(selectedIndicatorIds, [
    "no_bleeding",
    "can_stand",
    "has_companion",
  ]);
});

test("hasCompletedSafetyScreening requires every configured indicator", () => {
  const partialSelection = SAFETY_SCREENING_INDICATORS.slice(0, 5).map(
    (indicator) => indicator.id,
  );
  const completeSelection = SAFETY_SCREENING_INDICATORS.map(
    (indicator) => indicator.id,
  );

  assert.strictEqual(hasCompletedSafetyScreening(partialSelection), false);
  assert.strictEqual(hasCompletedSafetyScreening(completeSelection), true);
});

test("deriveSafetyScreeningRisk stays false only when all indicators are complete", () => {
  const completeSelection = SAFETY_SCREENING_INDICATORS.map(
    (indicator) => indicator.id,
  );

  assert.strictEqual(deriveSafetyScreeningRisk(["no_bleeding"]), true);
  assert.strictEqual(deriveSafetyScreeningRisk(completeSelection), false);
});
