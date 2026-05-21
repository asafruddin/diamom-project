import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { CLAIM_SAFE_COPY } from "@/constants/claim-safe-copy";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { getVasCategory } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function VasSummaryScreen() {
  const afterScore = usePracticeSessionStore((state) => state.afterScore);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const resetPracticeSession = usePracticeSessionStore(
    (state) => state.resetPracticeSession,
  );

  const previousScore = beforeScore ?? 0;
  const nextScore = afterScore ?? 0;
  const difference = previousScore - nextScore;
  const improvementCopy =
    difference > 0
      ? "Luar biasa! Latihan terasa lebih nyaman setelah sesi selesai."
      : difference === 0
        ? "Nilai tetap stabil. Anda dapat mengulangi latihan di waktu lain bila tubuh terasa aman."
        : "Nilai meningkat. Sebaiknya beristirahat dan hentikan latihan bila tubuh terasa tidak nyaman.";

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Hasil Ringkasan"
        title="Hasil Penilaian"
        description="Perubahan tingkat nyeri Anda berdasarkan input VAS sebelum dan sesudah sesi."
      />

      <SurfaceCard style={styles.summaryCard}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sebelum</Text>
            <Text style={styles.scoreValue}>{previousScore}</Text>
            <Text style={styles.scoreCategory}>
              {getVasCategory(previousScore)}
            </Text>
          </View>

          <Text style={styles.arrow}>-&gt;</Text>

          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sesudah</Text>
            <Text style={styles.scoreValue}>{nextScore}</Text>
            <Text style={styles.scoreCategory}>
              {getVasCategory(nextScore)}
            </Text>
          </View>
        </View>

        <Text style={styles.improvementCopy}>{improvementCopy}</Text>
        <Text style={styles.disclaimer}>
          {CLAIM_SAFE_COPY.RESULT_LANGUAGE.SELF_MONITORING}
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Selesai"
        onPress={() => {
          resetPracticeSession();
          router.push("/(tabs)/home");
        }}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    gap: diamomTheme.spacing.md,
  },
  scoreRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreBlock: {
    alignItems: "center",
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  scoreLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 13,
    fontWeight: "700",
  },
  scoreValue: {
    color: diamomTheme.colors.text,
    fontSize: 42,
    fontWeight: "800",
  },
  scoreCategory: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  arrow: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 28,
    fontWeight: "800",
    paddingHorizontal: diamomTheme.spacing.sm,
  },
  improvementCopy: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  disclaimer: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
  },
});
