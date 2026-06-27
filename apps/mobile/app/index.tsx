import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ActionButton, DiaScreen, InfoPill } from "@/components/dia-ui";
import { getInitialDiaMomRoute } from "@/features/entry/entry-routing";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function DiaMomEntryScreen() {
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

  const handleStart = () => {
    if (!isHydrated) {
      return;
    }

    const route = getInitialDiaMomRoute({
      hasAcceptedDisclaimer,
      hasCompletedMotherIdentity,
      hasCompletedSafetyScreening,
    });
    router.push(route);
  };

  return (
    <DiaScreen contentContainerStyle={styles.container} scroll={false}>
      <View style={styles.copyGroup}>
        <Image
          accessibilityLabel="Logo DiaMom"
          contentFit="contain"
          source={require("@/assets/icon/diamom-logo.png")}
          style={styles.brandMark}
        />
        <InfoPill label="Persalinan Nyaman, Ibu Bahagia" />
      </View>

      <Image
        accessibilityLabel="Ilustrasi ibu hamil"
        contentFit="contain"
        source={require("@/assets/icon/splash-screen.png")}
        style={styles.heroIllustration}
      />

      <View style={styles.actionGroup}>
        <ActionButton
          accessibilityLabel="Mulai menggunakan DiaMom"
          disabled={!isHydrated}
          fullWidth
          iconName="heart"
          iconPlacement="overlap-trailing"
          label={isHydrated ? "Mulai" : "Memuat..."}
          onPress={handleStart}
        />
        <ActionButton
          accessibilityLabel="Masuk sebagai peneliti"
          fullWidth
          label="Masuk sebagai Peneliti"
          onPress={() => router.push("/researcher/login")}
          variant="secondary"
        />
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: diamomTheme.spacing.lg,
    justifyContent: "center",
    paddingHorizontal: diamomTheme.spacing.md,
  },
  copyGroup: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
  },
  brandMark: {
    height: 112,
    maxWidth: 260,
    width: "68%",
  },
  subtitle: {
    color: diamomTheme.colors.mutedText,
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
  },
  heroIllustration: {
    alignSelf: "center",
    height: "60%",
    width: "88%",
  },
  actionGroup: {
    gap: diamomTheme.spacing.sm,
    paddingRight: diamomTheme.spacing.sm,
  },
});
