
export const SAFETY_SCREENING_INDICATORS = [
  { id: "no_bleeding", label: "Tidak ada perdarahan" },
  { id: "head_presentation", label: "Presentasi kepala" },
  { id: "normal_fhr", label: "DJJ normal" },
  {
    id: "no_obstetric_complications",
    label: "Tidak ada komplikasi obstetri",
  },
  { id: "can_stand", label: "Ibu mampu berdiri" },
  { id: "has_companion", label: "Didampingi bidan/pendamping" },
];

export const SAFETY_GATING_MESSAGES = {
  RISK_FOUND:
    "Skrining keamanan belum memenuhi semua indikator. Pastikan kembali bersama bidan atau tenaga kesehatan sebelum melanjutkan aktivitas.",
  SAFE: "Semua indikator keamanan sudah terpenuhi. Anda siap untuk memulai.",
};
