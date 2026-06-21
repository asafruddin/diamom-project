export const PRIVACY_RULES = {
  DATABASE_BACKED_PARTICIPANT_DATA: true,
  NO_BACKEND_ACCOUNT: true,
  NO_HEALTH_DATA_ANALYTICS: true,
  RESEARCHER_ACCESS_REQUIRES_AUTH: true,
} as const;

export const SENSITIVE_KEYS = ['name', 'nama', 'vas', 'vasscore', 'score', 'contact', 'kontak', 'phone', 'telepon', 'date', 'tanggal', 'week', 'minggu', 'duedate', 'emergency', 'darurat', 'safety', 'history', 'riwayat', 'notes', 'catatan', 'approval', 'persetujuan'] as const;

export const PRIVACY_AND_DELETION_REQUIREMENTS = 'Sensitive participant data is stored in the DiaMom database and must never be sent to analytics or crash reporters. Users must be able to delete their participant data from settings. Researcher access must stay authenticated and separate from the anonymous participant session.';
