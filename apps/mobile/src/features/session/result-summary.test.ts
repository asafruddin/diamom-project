import assert from "node:assert";
import test from "node:test";

import {
  buildResultChartBars,
  formatDurationMinutes,
  getPainChangeSummary,
  getResultStatusLabel,
} from "./result-summary";

test("formatDurationMinutes returns minutes label in Bahasa Indonesia", () => {
  assert.strictEqual(formatDurationMinutes(30), "30 menit");
});

test("getPainChangeSummary describes decreased pain", () => {
  assert.deepStrictEqual(getPainChangeSummary(6, 3), {
    difference: 3,
    label: "Penurunan 3 poin",
    trend: "decrease",
  });
});

test("getPainChangeSummary describes increased and stable pain", () => {
  assert.deepStrictEqual(getPainChangeSummary(3, 5), {
    difference: -2,
    label: "Peningkatan 2 poin",
    trend: "increase",
  });

  assert.deepStrictEqual(getPainChangeSummary(4, 4), {
    difference: 0,
    label: "Tidak ada perubahan",
    trend: "stable",
  });
});

test("getResultStatusLabel and buildResultChartBars return summary display data", () => {
  assert.strictEqual(getResultStatusLabel(), "Intervensi Selesai");
  assert.deepStrictEqual(buildResultChartBars(7, 4), [
    { key: "before", label: "Nyeri awal", score: 7 },
    { key: "after", label: "Nyeri akhir", score: 4 },
  ]);
});
