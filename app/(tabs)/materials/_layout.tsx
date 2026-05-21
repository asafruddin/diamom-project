import { Stack } from "expo-router";

import { diamomTheme } from "@/theme";

export default function MaterialsStackLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: diamomTheme.colors.background },
        headerShown: false,
      }}
    />
  );
}
