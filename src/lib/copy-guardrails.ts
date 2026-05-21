/**
 * Guardrails to ensure we don't accidentally log sensitive user data
 * or claim medical results.
 */

/**
 * Checks if a string contains potentially unsafe medical claims.
 * (For developer use/testing).
 */
export const hasUnsafeMedicalClaim = (text: string): boolean => {
  const unsafeKeywords = [
    'menyembuhkan',
    'dijamin',
    'pasti berhasil',
    'pengobatan medis',
    'kurangi nyeri secara medis',
    'menggantikan dokter',
    'menggantikan bidan'
  ];
  const lowerText = text.toLowerCase();
  return unsafeKeywords.some(keyword => lowerText.includes(keyword));
};

/**
 * A safe logging utility that automatically redacts sensitive keys.
 */
export const guardrailLog = (event: string, data?: Record<string, unknown>) => {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    const safeData: Record<string, unknown> = {};
    if (data) {
        for (const key in data) {
            const lowerKey = key.toLowerCase();
            const isSensitive = [
                'name',
                'nama',
                'vas',
                'contact',
                'kontak',
                'phone',
                'telepon',
                'date',
                'tanggal',
                'week',
                'minggu'
            ].some(sensitiveWord => lowerKey.includes(sensitiveWord));

            if (!isSensitive) {
                safeData[key] = data[key];
            } else {
                safeData[key] = '[REDACTED]';
            }
        }
    }
    console.log(`[DiaMom Event] ${event}`, Object.keys(safeData).length > 0 ? safeData : '');
  }
};
