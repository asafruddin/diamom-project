import assert from "node:assert";
import test from "node:test";

import { clampVasScore, formatTimer, getVasCategory, getVasScoreSurfaceColor } from "./vas-scale";

test("VAS scale helpers", async (t) => {
  await t.test("clampVasScore keeps values in range", () => {
    assert.strictEqual(clampVasScore(-2), 0);
    assert.strictEqual(clampVasScore(3.6), 4);
    assert.strictEqual(clampVasScore(14), 10);
  });

  await t.test("getVasCategory maps score buckets", () => {
    assert.strictEqual(getVasCategory(0), "Tidak Nyeri");
    assert.strictEqual(getVasCategory(2), "Nyeri Ringan");
    assert.strictEqual(getVasCategory(5), "Nyeri Sedang");
    assert.strictEqual(getVasCategory(8), "Nyeri Berat");
  });

  await t.test("formatTimer returns mm:ss", () => {
    assert.strictEqual(formatTimer(1800), "30:00");
    assert.strictEqual(formatTimer(65), "01:05");
  });

  await t.test("getVasScoreSurfaceColor returns tinted hex", () => {
    assert.match(getVasScoreSurfaceColor(3), /^#[0-9A-Fa-f]{8}$/);
  });
});
