import { Redirect } from "expo-router";

// Profile data collection has been removed — DiaMom is fully anonymous.
// Redirect any lingering navigation attempts to the consent screen.
export default function OnboardingProfileRedirect() {
  return <Redirect href="/onboarding/consent" />;
}
