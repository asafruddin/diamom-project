import { Tabs } from 'expo-router';

import { diamomTheme } from '@/theme';

export default function MainTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: diamomTheme.colors.primary,
        tabBarInactiveTintColor: diamomTheme.colors.mutedText,
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Beranda' }} />
    </Tabs>
  );
}
