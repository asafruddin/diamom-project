import { Redirect } from "expo-router";

// Pregnancy week is now captured as part of the local mother identity form.
export default function OnboardingPregnancyRedirect() {
  return <Redirect href="/onboarding/profile" />;
}
