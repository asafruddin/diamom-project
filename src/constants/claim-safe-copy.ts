import disclaimers from '../content/disclaimers.id.json';

export const CLAIM_SAFE_COPY = {
  MEDICAL_DISCLAIMER: disclaimers.medical_disclaimer,
  VAS_DISCLAIMER: disclaimers.vas_disclaimer,
  EMERGENCY_STOP_GUIDANCE: disclaimers.emergency_stop_guidance,
  HIGH_RISK_GUIDANCE: disclaimers.high_risk_guidance,
  RESULT_LANGUAGE: {
    VAS_BEFORE_AFTER: "VAS sebelum dan sesudah",
    SCORE_CHANGE: "Perubahan skor berdasarkan input Anda.",
    SELF_MONITORING: "Catatan ini membantu Anda memantau kenyamanan secara mandiri."
  },
  SUPPORT_POSITIONING: "DiaMom adalah aplikasi pendukung dan edukasi, bukan untuk diagnosis atau pengobatan medis."
} as const;
