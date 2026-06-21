import { Stack } from "expo-router";

import { diamomTheme } from "@/theme";

export default function VasStackLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: diamomTheme.colors.background },
        headerShown: false,
      }}
    />
  );
}
