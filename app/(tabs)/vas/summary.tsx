import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, SurfaceCard } from "@/components/dia-ui";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { getVasCategory, getVasPointColor } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

function getMotivationalMessage(difference: number): string {
  if (difference > 0) {
    return "Luar biasa! \u{1F49C}\nLabor Dance membantu Anda bergerak lebih nyaman. Terus lakukan secara teratur untuk manfaat yang lebih baik.";
  }
  if (difference === 0) {
    return "Nilai tetap stabil. Istirahatlah sejenak dan lanjutkan kembali bila tubuh terasa siap.";
  }
  return "Nilai meningkat. Dengarkan tubuh Anda dan beristirahatlah bila perlu. Konsultasikan dengan tenaga kesehatan Anda.";
}

export default function VasSummaryScreen() {
  const afterScore = usePracticeSessionStore((state) => state.afterScore);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const resetPracticeSession = usePracticeSessionStore(
    (state) => state.resetPracticeSession,
  );

  const prev = beforeScore ?? 0;
  const next = afterScore ?? 0;
  const difference = prev - next;

  return (
    <DiaScreen>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Hasil Penilaian</Text>
        <Text style={styles.subtitle}>Perubahan tingkat nyeri Anda</Text>
      </View>

      <SurfaceCard style={styles.comparisonCard}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sebelum</Text>
            <Text
              style={[styles.scoreValue, { color: getVasPointColor(prev) }]}
            >
              {prev}
            </Text>
            <Text
              style={[styles.scoreCategory, { color: getVasPointColor(prev) }]}
            >
              {getVasCategory(prev)}
            </Text>
          </View>

          <Text style={styles.arrow}>{"\u2192"}</Text>

          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sesudah</Text>
            <Text
              style={[styles.scoreValue, { color: getVasPointColor(next) }]}
            >
              {next}
            </Text>
            <Text
              style={[styles.scoreCategory, { color: getVasPointColor(next) }]}
            >
              {getVasCategory(next)}
            </Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.motivationalCard}>
        <Text style={styles.motivationalText}>
          {getMotivationalMessage(difference)}
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Selesai"
        onPress={() => {
          resetPracticeSession();
          router.replace("/(tabs)/vas");
        }}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: "center",
    gap: diamomTheme.spacing.xs,
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    textAlign: "center",
  },
  subtitle: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  comparisonCard: {
    paddingVertical: diamomTheme.spacing.lg,
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
    fontSize: 56,
    fontWeight: "800",
    lineHeight: 64,
  },
  scoreCategory: {
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
  motivationalCard: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderColor: diamomTheme.colors.primaryMuted,
  },
  motivationalText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 26,
  },
});
