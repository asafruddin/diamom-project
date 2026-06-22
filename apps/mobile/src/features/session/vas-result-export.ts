export type VasResultExportInput = {
  activityTitle: string;
  afterCategory: string;
  afterScore: number;
  beforeCategory: string;
  beforeScore: number;
  changeLabel: string;
  completedAtLabel: string;
  durationLabel: string;
  motherName: string;
  status: string;
};

const EXCEL_SAFE_NOTE =
  "Data VAS adalah catatan pemantauan mandiri untuk dukungan dan edukasi, bukan bukti hasil medis.";

export function buildVasResultExcelHtml(input: VasResultExportInput): string {
  const rows = [
    ["Nama", input.motherName],
    ["Aktivitas", input.activityTitle],
    ["Durasi", input.durationLabel],
    ["Nyeri awal", `${input.beforeScore} - ${input.beforeCategory}`],
    ["Nyeri akhir", `${input.afterScore} - ${input.afterCategory}`],
    ["Perubahan nyeri", input.changeLabel],
    ["Status", input.status],
    ["Waktu simpan", input.completedAtLabel],
    ["Catatan", EXCEL_SAFE_NOTE],
  ];

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    table { border-collapse: collapse; font-family: Arial, sans-serif; }
    th, td { border: 1px solid #EFDDE8; padding: 8px 12px; }
    th { background: #EAD7EC; color: #5C3C59; text-align: left; }
    td { color: #5C3C59; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr><th>Field</th><th>Nilai</th></tr>
    </thead>
    <tbody>
${rows
  .map(
    ([label, value]) =>
      `      <tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
    </tbody>
  </table>
</body>
</html>`;
}

export function getVasResultExcelFileName(savedAt?: string): string {
  const date = savedAt ? new Date(savedAt) : new Date();
  const safeDate = Number.isNaN(date.getTime())
    ? "tanggal-tidak-valid"
    : date.toISOString().slice(0, 10);

  return `diamom-hasil-vas-${safeDate}.xls`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
