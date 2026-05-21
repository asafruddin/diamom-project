import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { diamomTheme } from "@/theme";

export default function RootLayout() {
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
