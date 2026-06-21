// Home requires local identity, disclaimer acceptance, and safety screening completion.
export type DiaMomEntryState = {
  hasAcceptedDisclaimer: boolean;
  hasCompletedMotherIdentity: boolean;
  hasCompletedSafetyScreening: boolean;
};

export type DiaMomEntryRoute = "/onboarding/intro" | "/(tabs)/home";

export function getInitialDiaMomRoute(
  state: DiaMomEntryState,
): DiaMomEntryRoute {
  if (
    state.hasAcceptedDisclaimer &&
    state.hasCompletedMotherIdentity &&
    state.hasCompletedSafetyScreening
  ) {
    return "/(tabs)/home";
  }

  return "/onboarding/intro";
}
