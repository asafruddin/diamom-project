import { Redirect } from "expo-router";

// Pregnancy data collection has been removed — DiaMom is fully anonymous.
// Redirect any lingering navigation attempts to the consent screen.
export default function OnboardingPregnancyRedirect() {
  return <Redirect href="/onboarding/consent" />;
}
