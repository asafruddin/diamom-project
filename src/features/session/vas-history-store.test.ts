import assert from "node:assert";
import test from "node:test";

import { createVasHistoryRecord } from "./vas-history-store";

test("createVasHistoryRecord stores clamped before and after VAS scores", () => {
  const record = createVasHistoryRecord({
    activityTitle: "Labor Dance",
    afterScore: -2,
    beforeScore: 12,
    id: "record-1",
    savedAt: "2026-05-26T08:46:00.000Z",
  });

  assert.deepStrictEqual(record, {
    activityTitle: "Labor Dance",
    afterScore: 0,
    beforeScore: 10,
    id: "record-1",
    savedAt: "2026-05-26T08:46:00.000Z",
  });
});

test("createVasHistoryRecord defaults activity title and timestamp", () => {
  const record = createVasHistoryRecord({
    afterScore: 3,
    beforeScore: 6,
    id: "record-2",
  });

  assert.strictEqual(record.activityTitle, "Labor Dance");
  assert.strictEqual(record.beforeScore, 6);
  assert.strictEqual(record.afterScore, 3);
  assert.match(record.savedAt, /^\d{4}-\d{2}-\d{2}T/);
});
