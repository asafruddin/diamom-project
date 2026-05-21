import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    IllustrationPanel,
    InfoPill,
} from "@/components/dia-ui";
import { getInitialDiaMomRoute } from "@/features/entry/entry-routing";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function DiaMomEntryScreen() {
  const hasAcceptedDisclaimer = useProfileStore(
    (state) => state.hasAcceptedDisclaimer,
  );
  const hasCompletedSafetyScreening = useProfileStore(
    (state) => state.hasCompletedSafetyScreening,
  );

  const handleStart = () => {
    const route = getInitialDiaMomRoute({
      hasAcceptedDisclaimer,
      hasCompletedSafetyScreening,
    });
    router.push(route);
  };

  return (
    <DiaScreen contentContainerStyle={styles.container} scroll={false}>
      <View style={styles.copyGroup}>
        <InfoPill label="Persalinan Nyaman, Ibu Bahagia" />
        <Text style={styles.brand}>DiaMom App</Text>
        <Text style={styles.subtitle}>
          Teman belajar untuk napas, Labor Dance, dan pemantauan kenyamanan diri
          menjelang persalinan.
        </Text>
      </View>

      <IllustrationPanel
        badge="DM"
        title="Belajar dengan tenang, bergerak dengan lembut."
        detail="DiaMom tidak menyimpan nama, usia kehamilan, atau kontak pribadi Anda."
      />

      <View style={styles.ctaGroup}>
        <ActionButton
          accessibilityLabel="Mulai menggunakan DiaMom"
          label="Mulai"
          onPress={handleStart}
        />
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: diamomTheme.spacing.xl,
    justifyContent: "center",
  },
  copyGroup: { gap: diamomTheme.spacing.sm },
  brand: {
    color: diamomTheme.colors.text,
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 50,
  },
  subtitle: {
    color: diamomTheme.colors.mutedText,
    fontSize: 17,
    lineHeight: 26,
  },
  ctaGroup: {
    marginTop: diamomTheme.spacing.sm,
  },
});
