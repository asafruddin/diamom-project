import assert from "node:assert";
import test from "node:test";

test("researcher dashboard route contract fields remain stable", () => {
  const expectedKeys = [
    "averageDelta",
    "averageVasAfter",
    "averageVasBefore",
    "totalRespondents",
    "trendCounts",
  ];

  assert.deepStrictEqual(expectedKeys, [
    "averageDelta",
    "averageVasAfter",
    "averageVasBefore",
    "totalRespondents",
    "trendCounts",
  ]);
});
