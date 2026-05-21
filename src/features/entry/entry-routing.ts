// DiaMom is fully anonymous — no profile gate.
// Home requires disclaimer acceptance and safety screening completion.
export type DiaMomEntryState = {
  hasAcceptedDisclaimer: boolean;
  hasCompletedSafetyScreening: boolean;
};

export type DiaMomEntryRoute = "/onboarding/intro" | "/(tabs)/home";

export function getInitialDiaMomRoute(
  state: DiaMomEntryState,
): DiaMomEntryRoute {
  if (state.hasAcceptedDisclaimer && state.hasCompletedSafetyScreening) {
    return "/(tabs)/home";
  }

  return "/onboarding/intro";
}
