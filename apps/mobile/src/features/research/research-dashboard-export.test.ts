import assert from "node:assert";
import test from "node:test";

import {
  buildResearchDashboardExcelHtml,
  getResearchDashboardExcelFileName,
} from "./research-dashboard-export";

const exportFixture = {
  sessions: [
    {
      activityTitle: "Labor Dance",
      afterScore: 3,
      beforeScore: 6,
      durationMinutes: 30,
      externalSessionId: "vas-1",
      motherName: "Ayu",
      recordedAt: "2026-06-21T10:00:00.000Z",
      status: "Intervensi Selesai",
    },
  ],
  summary: {
    averageDelta: 3,
    averageVasAfter: 3,
    averageVasBefore: 6,
    totalRespondents: 1,
    trendCounts: {
      decrease: 1,
      increase: 0,
      stable: 0,
    },
  },
};

test("buildResearchDashboardExcelHtml includes summary and session tables", () => {
  const html = buildResearchDashboardExcelHtml(exportFixture);

  assert.match(html, /Ringkasan Dashboard Peneliti/);
  assert.match(html, /Total Responden/);
  assert.match(html, /Data Sesi Peserta/);
  assert.match(html, /Penurunan 3 poin/);
  assert.match(html, /pemantauan mandiri/);
});

test("buildResearchDashboardExcelHtml escapes sensitive free text", () => {
  const html = buildResearchDashboardExcelHtml({
    ...exportFixture,
    sessions: [
      {
        ...exportFixture.sessions[0],
        motherName: "<Ayu & Bunda>",
      },
    ],
  });

  assert.match(html, /&lt;Ayu &amp; Bunda&gt;/);
  assert.doesNotMatch(html, /<Ayu & Bunda>/);
});

test("getResearchDashboardExcelFileName uses export date", () => {
  assert.strictEqual(
    getResearchDashboardExcelFileName(new Date("2026-06-22T06:25:00.000Z")),
    "diamom-dashboard-peneliti-2026-06-22.xls",
  );
});
