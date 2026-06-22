import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, VasSelector } from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { usePracticeSessionStore } from "@/features/session/session-store";
import {
  VasLegendIllustrationPanel,
  VasScoreDisplay,
} from "@/features/session/vas-components";
import { VAS_ILLUSTRATIONS } from "@/features/session/vas-content";
import { useVasHistoryStore } from "@/features/session/vas-history-store";
import { diamomTheme } from "@/theme";

export default function VasAfterScreen() {
  const activityTitle = usePracticeSessionStore((state) => state.activityTitle);
  const afterScore = usePracticeSessionStore((state) => state.afterScore);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const setAfterScore = usePracticeSessionStore((state) => state.setAfterScore);
  const addRecord = useVasHistoryStore((state) => state.addRecord);
  const motherName = useProfileStore(
    (state) => state.motherIdentity?.motherName ?? "Ibu",
  );
  const [selectedScore, setSelectedScore] = useState(afterScore ?? 3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      setAfterScore(selectedScore);
      await addRecord({
        activityTitle,
        afterScore: selectedScore,
        beforeScore: beforeScore ?? selectedScore,
        durationMinutes,
        motherName,
        status: "Intervensi Selesai",
      });

      router.push("/(tabs)/vas/summary");
    } catch {
      Alert.alert(
        "Hasil belum tersimpan",
        "Silakan coba lagi. Data VAS belum berhasil disimpan ke database.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DiaScreen>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Penilaian Nyeri (VAS)</Text>
        <Text style={styles.subtitle}>Setelah Kegiatan</Text>
        <Text style={styles.description}>
          Geser slider sesuai nyeri yang Anda rasakan setelah melakukan Labor
          Dance.
        </Text>
      </View>

      <VasSelector
        onChange={setSelectedScore}
        showSummary={false}
        value={selectedScore}
      />

      <VasScoreDisplay score={selectedScore} />

      <VasLegendIllustrationPanel
        accessibilityLabel="Ilustrasi penilaian nyeri setelah kegiatan"
        source={VAS_ILLUSTRATIONS.after}
      />

      <ActionButton
        accessibilityLabel="Simpan hasil penilaian VAS"
        label={isSaving ? "Menyimpan..." : "Simpan Hasil"}
        onPress={handleSave}
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
});
