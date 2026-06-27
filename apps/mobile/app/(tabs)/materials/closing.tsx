import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen } from "@/components/dia-ui";
import { CLOSING_DETAIL } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function ClosingScreen() {
  return (
    <DiaScreen contentContainerStyle={styles.container} scroll={false}>
      {CLOSING_DETAIL.heroImage ? (
        <View style={styles.illustrationWrap}>
          <Image
            accessibilityLabel={CLOSING_DETAIL.title}
            contentFit="cover"
            source={CLOSING_DETAIL.heroImage}
            style={styles.illustration}
          />
        </View>
      ) : null}

      {CLOSING_DETAIL.closingBody ? (
        <Text style={styles.body}>{CLOSING_DETAIL.closingBody}</Text>
      ) : null}

      {CLOSING_DETAIL.encouragementLine ? (
        <Text style={styles.encouragement}>
          {CLOSING_DETAIL.encouragementLine}
        </Text>
      ) : null}

      {CLOSING_DETAIL.affirmationLine ? (
        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationText}>
            {CLOSING_DETAIL.affirmationLine}
          </Text>
        </View>
      ) : null}

      <ActionButton
        accessibilityLabel="Lanjut ke penilaian VAS"
        label="Lanjut ke Penilaian VAS"
        onPress={() => router.push("/(tabs)/vas")}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: diamomTheme.spacing.lg,
    justifyContent: "center",
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingVertical: diamomTheme.spacing.xl,
  },
  illustrationWrap: {
    alignItems: "center",
    alignSelf: "center",
    height: "30%",
    justifyContent: "center",
    width: "100%",
  },
  illustration: {
    height: "100%",
    width: "100%",
  },
  body: {
    color: diamomTheme.colors.text,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  encouragement: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  affirmationCard: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    experimental_backgroundImage: `linear-gradient(180deg, ${diamomTheme.colors.primaryMuted}, ${diamomTheme.colors.backgroundElevated})`,
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingVertical: diamomTheme.spacing.md,
  },
  affirmationText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
});
