import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import {
  ActionButton,
  DiaScreen,
  SurfaceCard,
  VasSelector,
} from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { useVasHistoryStore } from "@/features/session/vas-history-store";
import { getVasCategory } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

const VAS_LEGEND = [
  { label: "Tidak Nyeri", range: "0" },
  { label: "Nyeri Ringan", range: "1-3" },
  { label: "Nyeri Sedang", range: "4-6" },
  { label: "Nyeri Berat", range: "7-10" },
] as const;

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

  const handleSave = () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      setAfterScore(selectedScore);
      addRecord({
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
        "Silakan coba lagi. Data VAS hanya disimpan lokal di perangkat ini.",
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

      <View style={styles.scoreSection}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{selectedScore}</Text>
        </View>
        <Text style={styles.scoreCategory}>
          {getVasCategory(selectedScore)}
        </Text>
      </View>

      <SurfaceCard>
        <Text style={styles.legendTitle}>Keterangan:</Text>
        {VAS_LEGEND.map((item) => (
          <View key={item.range} style={styles.legendRow}>
            <Text style={styles.legendRange}>{item.range}</Text>
            <Text style={styles.legendSeparator}>:</Text>
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </SurfaceCard>

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
  scoreSection: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
  },
  scoreCircle: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.illustrationBase,
    borderRadius: diamomTheme.radius.pill,
    height: 120,
    justifyContent: "center",
    width: 120,
  },
  scoreValue: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 56,
    fontWeight: "800",
  },
  scoreCategory: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  legendTitle: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: diamomTheme.spacing.xs,
  },
  legendRow: {
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  legendRange: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    minWidth: 32,
  },
  legendSeparator: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
  },
  legendLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
  },
});
