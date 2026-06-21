import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs, router } from "expo-router";
import { StyleSheet } from "react-native";

import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function MainTabsLayout() {
  const isHydrated = useProfileStore((state) => state.isHydrated);
  const hasAcceptedDisclaimer = useProfileStore(
    (state) => state.hasAcceptedDisclaimer,
  );
  const hasCompletedSafetyScreening = useProfileStore(
    (state) => state.hasCompletedSafetyScreening,
  );
  const hasCompletedMotherIdentity = useProfileStore(
    (state) => state.hasCompletedMotherIdentity,
  );

  if (!isHydrated) {
    return null;
  }

  if (
    !hasAcceptedDisclaimer ||
    !hasCompletedMotherIdentity ||
    !hasCompletedSafetyScreening
  ) {
    return <Redirect href="/onboarding/intro" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: diamomTheme.colors.primary,
        tabBarInactiveTintColor: diamomTheme.colors.mutedText,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="materials"
        options={{
          title: "Materi",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vas"
        listeners={{
          tabPress: () => {
            router.replace("/(tabs)/vas");
          },
        }}
        options={{
          popToTopOnBlur: true,
          title: "VAS",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: diamomTheme.colors.tabBar,
    borderTopColor: diamomTheme.colors.border,
    height: 74,
    paddingBottom: 10,
    paddingTop: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
});
