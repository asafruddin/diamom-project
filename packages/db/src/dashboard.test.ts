import assert from "node:assert";
import test from "node:test";

import { buildDashboardSummary } from "./dashboard";

test("buildDashboardSummary returns aggregate VAS statistics", () => {
  const summary = buildDashboardSummary(2, [
    {
      activityTitle: "Labor Dance",
      afterScore: 3,
      beforeScore: 6,
      externalSessionId: "vas-1",
      motherName: "Ayu",
      recordedAt: "2026-06-21T10:00:00.000Z",
      status: "Intervensi Selesai",
    },
    {
      activityTitle: "Labor Dance",
      afterScore: 5,
      beforeScore: 4,
      externalSessionId: "vas-2",
      motherName: "Bunga",
      recordedAt: "2026-06-21T11:00:00.000Z",
      status: "Intervensi Selesai",
    },
  ]);

  assert.deepStrictEqual(summary, {
    averageDelta: 1,
    averageVasAfter: 4,
    averageVasBefore: 5,
    totalRespondents: 2,
    trendCounts: {
      decrease: 1,
      increase: 1,
      stable: 0,
    },
  });
});
