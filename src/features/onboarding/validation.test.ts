import assert from "node:assert";
import test from "node:test";

import {
  validateMotherIdentity,
  validatePregnancyProgress,
} from "./validation";

test("validateMotherIdentity", async (t) => {
  await t.test("accepts complete mother identity input", () => {
    const result = validateMotherIdentity({
      age: "28",
      dilationCm: 4,
      gpa: "G2P1A0",
      motherName: "Siti Aminah",
      pregnancyWeek: "38",
    });

    assert.strictEqual(result.isValid, true);
    if (result.isValid) {
      assert.deepStrictEqual(result.value, {
        age: 28,
        dilationCm: 4,
        gpa: "G2P1A0",
        motherName: "Siti Aminah",
        pregnancyWeek: 38,
      });
    }
  });

  await t.test("rejects missing and out-of-range values", () => {
    const result = validateMotherIdentity({
      age: "9",
      dilationCm: null,
      gpa: "",
      motherName: "A",
      pregnancyWeek: "46",
    });

    assert.strictEqual(result.isValid, false);
    if (!result.isValid) {
      assert.ok(result.errors.motherName);
      assert.ok(result.errors.age);
      assert.ok(result.errors.gpa);
      assert.ok(result.errors.pregnancyWeek);
      assert.ok(result.errors.dilationCm);
    }
  });
});

test("validatePregnancyProgress", async (t) => {
  await t.test("accepts pregnancy week and dilation updates", () => {
    const result = validatePregnancyProgress({
      dilationCm: 7,
      pregnancyWeek: "39",
    });

    assert.strictEqual(result.isValid, true);
    if (result.isValid) {
      assert.deepStrictEqual(result.value, {
        dilationCm: 7,
        pregnancyWeek: 39,
      });
    }
  });

  await t.test("rejects invalid pregnancy progress updates", () => {
    const result = validatePregnancyProgress({
      dilationCm: null,
      pregnancyWeek: "0",
    });

    assert.strictEqual(result.isValid, false);
    if (!result.isValid) {
      assert.ok(result.errors.dilationCm);
      assert.ok(result.errors.pregnancyWeek);
    }
  });
});
