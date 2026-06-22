import assert from "node:assert";
import test from "node:test";

import {
  buildVasResultExcelHtml,
  getVasResultExcelFileName,
} from "./vas-result-export";

test("buildVasResultExcelHtml returns Excel-compatible claim-safe table", () => {
  const html = buildVasResultExcelHtml({
    activityTitle: "Labor Dance",
    afterCategory: "Nyeri Ringan",
    afterScore: 2,
    beforeCategory: "Nyeri Sedang",
    beforeScore: 6,
    changeLabel: "Penurunan 4 poin",
    completedAtLabel: "22 Juni 2026 pukul 06.25",
    durationLabel: "30 menit",
    motherName: "Mano",
    status: "Intervensi Selesai",
  });

  assert.match(html, /<table>/);
  assert.match(html, /Nyeri awal/);
  assert.match(html, /6 - Nyeri Sedang/);
  assert.match(html, /pemantauan mandiri/);
  assert.doesNotMatch(html, /bukti hasil medis<\/td><td>/);
});

test("buildVasResultExcelHtml escapes sensitive free text", () => {
  const html = buildVasResultExcelHtml({
    activityTitle: "Labor Dance",
    afterCategory: "Nyeri Ringan",
    afterScore: 2,
    beforeCategory: "Nyeri Sedang",
    beforeScore: 6,
    changeLabel: "Penurunan 4 poin",
    completedAtLabel: "22 Juni 2026 pukul 06.25",
    durationLabel: "30 menit",
    motherName: "<Mano & Bunda>",
    status: "Intervensi Selesai",
  });

  assert.match(html, /&lt;Mano &amp; Bunda&gt;/);
  assert.doesNotMatch(html, /<Mano & Bunda>/);
});

test("getVasResultExcelFileName uses saved date", () => {
  assert.strictEqual(
    getVasResultExcelFileName("2026-06-22T06:25:00.000Z"),
    "diamom-hasil-vas-2026-06-22.xls",
  );
});
