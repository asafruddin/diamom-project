export const PRIVACY_RULES = { LOCAL_STORAGE_ONLY: true, NO_BACKEND_ACCOUNT: true, NO_CLOUD_SYNC: true, NO_HEALTH_DATA_ANALYTICS: true } as const;

export const SENSITIVE_KEYS = ['name', 'nama', 'vas', 'vasscore', 'score', 'contact', 'kontak', 'phone', 'telepon', 'date', 'tanggal', 'week', 'minggu', 'duedate', 'emergency', 'darurat', 'safety', 'history', 'riwayat', 'notes', 'catatan', 'approval', 'persetujuan'] as const;

export const PRIVACY_AND_DELETION_REQUIREMENTS = 'All sensitive user data must remain on the local device. Users must have the ability to delete all their local data from the settings screen. No sensitive health information, VAS scores, or personal identifiers may be sent to any external server, analytics service, or crash reporter. Future features involving backend sync, provider dashboards, or AI require a separate privacy and legal review before implementation.';
