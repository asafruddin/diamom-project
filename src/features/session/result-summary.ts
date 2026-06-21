export type ResultTrend = "increase" | "decrease" | "stable";

export type ResultChartBar = {
  key: "before" | "after";
  label: string;
  score: number;
};

export function formatDurationMinutes(durationMinutes: number): string {
  return `${durationMinutes} menit`;
}

export function getPainChangeSummary(beforeScore: number, afterScore: number): {
  difference: number;
  label: string;
  trend: ResultTrend;
} {
  const difference = beforeScore - afterScore;

  if (difference > 0) {
    return {
      difference,
      label: `Penurunan ${difference} poin`,
      trend: "decrease",
    };
  }

  if (difference < 0) {
    return {
      difference,
      label: `Peningkatan ${Math.abs(difference)} poin`,
      trend: "increase",
    };
  }

  return {
    difference,
    label: "Tidak ada perubahan",
    trend: "stable",
  };
}

export function getResultStatusLabel(): string {
  return "Intervensi Selesai";
}

export function buildResultChartBars(
  beforeScore: number,
  afterScore: number,
): ResultChartBar[] {
  return [
    { key: "before", label: "Nyeri awal", score: beforeScore },
    { key: "after", label: "Nyeri akhir", score: afterScore },
  ];
}
