
export const SAFETY_WARNING_SIGNS = [
  { id: 'bleeding', label: 'Pendarahan' },
  { id: 'severe_dizziness', label: 'Pusing hebat atau merasa ingin pingsan' },
  { id: 'severe_pain', label: 'Nyeri hebat yang tidak biasa' },
  { id: 'shortness_of_breath', label: 'Sesak napas hebat' },
  { id: 'chest_pain', label: 'Nyeri dada' },
  { id: 'headache', label: 'Sakit kepala hebat' },
  { id: 'muscle_weakness', label: 'Kelemahan otot' },
  { id: 'calf_pain_swelling', label: 'Nyeri atau bengkak pada betis' },
  { id: 'regular_contractions', label: 'Kontraksi menyakitkan yang teratur' },
  { id: 'leaking_fluid', label: 'Keluar cairan atau ketuban pecah' },
  { id: 'bed_rest', label: 'Anjuran istirahat total (bed rest) dari dokter/bidan' },
  { id: 'provider_prohibited', label: 'Larangan melakukan aktivitas fisik dari dokter/bidan' },
];

export const SAFETY_GATING_MESSAGES = {
  RISK_FOUND: 'Berdasarkan jawaban Anda, sebaiknya Anda beristirahat dan tidak melanjutkan aktivitas fisik. Silakan berkonsultasi dengan bidan atau dokter Anda.',
  SAFE: 'Anda siap untuk memulai.',
};
