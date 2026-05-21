
export type DiaMomEntryState = {
  hasCompletedProfile: boolean;
  hasAcceptedDisclaimer: boolean;
  hasCompletedSafetyScreening: boolean;
};

export type DiaMomEntryRoute = '/onboarding/intro' | '/(tabs)/home';

export function getInitialDiaMomRoute(state: DiaMomEntryState): DiaMomEntryRoute {
  if (state.hasCompletedProfile && state.hasAcceptedDisclaimer && state.hasCompletedSafetyScreening) {
    return '/(tabs)/home';
  }

  return '/onboarding/intro';
}
