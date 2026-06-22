import type { DashboardExportResponse } from "@diamom/contracts";

import {
  formatDurationMinutes,
  getPainChangeSummary,
} from "@/features/session/result-summary";

const EXCEL_SAFE_NOTE =
  "Data VAS adalah catatan pemantauan mandiri untuk dukungan dan edukasi, bukan bukti hasil medis.";

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  month: "long",
  year: "numeric",
});

export function buildResearchDashboardExcelHtml(
  data: DashboardExportResponse,
): string {
  const summaryRows = [
    ["Total Responden", String(data.summary.totalRespondents)],
    ["Rata-rata VAS Sebelum", formatMetric(data.summary.averageVasBefore)],
    ["Rata-rata VAS Sesudah", formatMetric(data.summary.averageVasAfter)],
    ["Rata-rata Delta Nyeri", formatMetric(data.summary.averageDelta)],
    ["Tren Menurun", String(data.summary.trendCounts.decrease)],
    ["Tren Meningkat", String(data.summary.trendCounts.increase)],
    ["Tren Tetap", String(data.summary.trendCounts.stable)],
    ["Catatan", EXCEL_SAFE_NOTE],
  ];

  const sessionHeader = [
    "Nama",
    "Aktivitas",
    "VAS Sebelum",
    "VAS Sesudah",
    "Perubahan Nyeri",
    "Durasi",
    "Status",
    "Waktu Catat",
  ];

  const sessionRows = data.sessions.map((session) => {
    const change = getPainChangeSummary(session.beforeScore, session.afterScore);

    return [
      session.motherName,
      session.activityTitle,
      String(session.beforeScore),
      String(session.afterScore),
      change.label,
      session.durationMinutes
        ? formatDurationMinutes(session.durationMinutes)
        : "-",
      session.status,
      formatRecordedAt(session.recordedAt),
    ];
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    table { border-collapse: collapse; font-family: Arial, sans-serif; margin-bottom: 24px; width: 100%; }
    th, td { border: 1px solid #EFDDE8; padding: 8px 12px; }
    th { background: #EAD7EC; color: #5C3C59; text-align: left; }
    td { color: #5C3C59; }
    h2 { color: #5C3C59; font-family: Arial, sans-serif; font-size: 16px; margin: 0 0 12px; }
  </style>
</head>
<body>
  <h2>Ringkasan Dashboard Peneliti</h2>
  <table>
    <thead>
      <tr><th>Metrik</th><th>Nilai</th></tr>
    </thead>
    <tbody>
${summaryRows
  .map(
    ([label, value]) =>
      `      <tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
    </tbody>
  </table>

  <h2>Data Sesi Peserta</h2>
  <table>
    <thead>
      <tr>${sessionHeader.map((label) => `<th>${escapeHtml(label)}</th>`).join("")}</tr>
    </thead>
    <tbody>
${sessionRows
  .map(
    (row) =>
      `      <tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}</tr>`,
  )
  .join("\n")}
    </tbody>
  </table>
</body>
</html>`;
}

export function getResearchDashboardExcelFileName(exportedAt = new Date()): string {
  const safeDate = Number.isNaN(exportedAt.getTime())
    ? "tanggal-tidak-valid"
    : exportedAt.toISOString().slice(0, 10);

  return `diamom-dashboard-peneliti-${safeDate}.xls`;
}

function formatMetric(value: number): string {
  return value.toFixed(2);
}

function formatRecordedAt(recordedAt: string): string {
  const date = new Date(recordedAt);

  if (Number.isNaN(date.getTime())) {
    return recordedAt;
  }

  return dateTimeFormatter.format(date);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
