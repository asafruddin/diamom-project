import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, VasSelector } from "@/components/dia-ui";
import { usePracticeSessionStore } from "@/features/session/session-store";
import {
  VasLegendIllustrationPanel,
  VasScoreDisplay,
} from "@/features/session/vas-components";
import { VAS_ILLUSTRATIONS } from "@/features/session/vas-content";
import { diamomTheme } from "@/theme";

export default function VasBeforeScreen() {
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const setBeforeScore = usePracticeSessionStore(
    (state) => state.setBeforeScore,
  );
  const [selectedScore, setSelectedScore] = useState(beforeScore ?? 0);

  return (
    <DiaScreen>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Penilaian Nyeri (VAS)</Text>
        <Text style={styles.subtitle}>Sebelum Kegiatan</Text>
        <Text style={styles.description}>
          Geser slider sesuai nyeri yang Anda rasakan sekarang.
        </Text>
      </View>

      <VasSelector
        onChange={setSelectedScore}
        showSummary={false}
        value={selectedScore}
      />

      <VasScoreDisplay score={selectedScore} />

      <VasLegendIllustrationPanel
        accessibilityLabel="Ilustrasi penilaian nyeri sebelum kegiatan"
        source={VAS_ILLUSTRATIONS.before}
      />

      <View style={styles.buttonGroup}>
        <ActionButton
          accessibilityLabel="Mulai kegiatan Labor Dance"
          label="Mulai Kegiatan"
          onPress={() => {
            setBeforeScore(selectedScore);
            router.push("/(tabs)/vas/session");
          }}
        />
      </View>
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
    color: diamomTheme.colors.accentStrong,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonGroup: {
    gap: diamomTheme.spacing.md,
  },
});
