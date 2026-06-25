import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useParticipantStore } from "@/features/participant/participant-store";
import { useResearcherAuthStore } from "@/features/research/researcher-auth-store";
import { diamomTheme } from "@/theme";

export default function RootLayout() {
  const hydrateParticipant = useParticipantStore((state) => state.hydrate);
  const hydrateResearcher = useResearcherAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrateParticipant();
    void hydrateResearcher();
  }, [hydrateParticipant, hydrateResearcher]);

  useEffect(() => {
    void ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    ).catch(() => undefined);
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: diamomTheme.colors.background },
          headerShown: false,
        }}
      />
      <StatusBar style="dark" />
    </>
  );
}
