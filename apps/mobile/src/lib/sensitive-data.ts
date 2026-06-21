import { SENSITIVE_KEYS } from '../constants/privacy';

export const isSensitiveKey = (key: string): boolean => {
  const lowerKey = key.toLowerCase();
  return SENSITIVE_KEYS.some((word) => lowerKey.includes(word));
};

export const redactSensitiveData = (data: Record<string, unknown>): Record<string, unknown> => {
  const safeData: Record<string, unknown> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (isSensitiveKey(key)) {
        safeData[key] = '[REDACTED]';
      } else {
        safeData[key] = data[key];
      }
    }
  }
  return safeData;
};
