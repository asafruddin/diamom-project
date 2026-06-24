import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { DiaScreen, SurfaceCard } from "@/components/dia-ui";
import { HOME_SHORTCUTS } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

type ShortcutId = (typeof HOME_SHORTCUTS)[number]["id"];

type HomeShortcutCardProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  title: string;
};

const HOME_SHORTCUT_ICONS: Record<ShortcutId, keyof typeof Ionicons.glyphMap> =
  {
    about: "person",
    materials: "book",
    vas: "stats-chart",
    "vas-history": "time",
  };

function HomeShortcutCard({ iconName, onPress, title }: HomeShortcutCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Buka ${title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.shortcutPressed]}
    >
      <SurfaceCard style={styles.shortcutCard}>
        <Ionicons
          color={diamomTheme.colors.primaryStrong}
          name={iconName}
          size={24}
        />
        <Text style={styles.shortcutTitle}>{title}</Text>
        <Ionicons
          color={diamomTheme.colors.textSoft}
          name="chevron-forward"
          size={20}
        />
      </SurfaceCard>
    </Pressable>
  );
}

export default function HomeDashboardScreen() {
  return (
    <DiaScreen contentContainerStyle={styles.contentContainer}>
      <View style={styles.greetingSection}>
        <Text style={styles.greetingTitle}>Halo, Ibu Hebat!</Text>
        <Text style={styles.greetingDescription}>
          Mari persiapkan persalinan yang sehat dan nyaman.
        </Text>
      </View>

      <View style={styles.cardGroup}>
        {HOME_SHORTCUTS.map((shortcut) => (
          <HomeShortcutCard
            iconName={HOME_SHORTCUT_ICONS[shortcut.id]}
            key={shortcut.id}
            onPress={() => router.push(shortcut.href)}
            title={shortcut.title}
          />
        ))}
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: diamomTheme.spacing.xl,
    paddingBottom: diamomTheme.spacing.xl,
    paddingTop: diamomTheme.spacing.xl,
  },
  cardGroup: {
    gap: diamomTheme.spacing.md,
  },
  greetingSection: {
    gap: diamomTheme.spacing.sm,
    paddingTop: diamomTheme.spacing.sm,
  },
  greetingTitle: {
    color: diamomTheme.colors.text,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },
  greetingDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 320,
  },
  shortcutPressed: {
    opacity: 0.88,
  },
  shortcutCard: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.lg,
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    minHeight: 88,
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingVertical: diamomTheme.spacing.md,
    shadowColor: diamomTheme.colors.accentStrong,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  shortcutTitle: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
  },
});
