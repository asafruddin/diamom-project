import { redactSensitiveData } from './sensitive-data';
import { PRIVACY_RULES } from '../constants/privacy';

type AnalyticsEvent = 'onboarding_started' | 'session_started' | 'emergency_stop_clicked' | 'app_opened' | 'disclaimer_accepted';

export const logAnalyticsEvent = (event: AnalyticsEvent, params?: Record<string, unknown>): void => {
  if (PRIVACY_RULES.NO_HEALTH_DATA_ANALYTICS) {
    const safeParams = params ? redactSensitiveData(params) : undefined;
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
       console.log('[Analytics] ' + event, safeParams ? safeParams : '');
    }
  }
};
