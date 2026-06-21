import { Redirect, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { SAFETY_SCREENING_INDICATORS } from "@/constants/safety";
import {
  getSelectedSafetyIndicatorIds,
  hasCompletedSafetyScreening,
} from "@/features/onboarding/safety-screening";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function OnboardingSafetyScreeningScreen() {
  const saveSafetyScreening = useProfileStore(
    (state) => state.saveSafetyScreening,
  );
  const hasCompletedMotherIdentity = useProfileStore(
    (state) => state.hasCompletedMotherIdentity,
  );
  const [selectedIndicators, setSelectedIndicators] = useState<
    Record<string, boolean>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleIndicator = (id: string) => {
    setSelectedIndicators((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedIndicatorIds =
    getSelectedSafetyIndicatorIds(selectedIndicators);
  const canStart = hasCompletedSafetyScreening(selectedIndicatorIds);

  const handleSave = async () => {
    if (!canStart) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await saveSafetyScreening(selectedIndicatorIds);
      router.push("/(tabs)/home");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Skrining keamanan belum berhasil disimpan ke server.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!hasCompletedMotherIdentity) {
    return <Redirect href="/onboarding/profile" />;
  }

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Skrining"
        showBack
        title="Skrining Keamanan"
        description="Centang semua indikator berikut sebelum memulai. Lanjutkan hanya bila seluruh kondisi ini sudah dipastikan aman."
      />

      <View style={styles.list}>
        {SAFETY_SCREENING_INDICATORS.map((indicator) => {
          const isSelected = !!selectedIndicators[indicator.id];
          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              key={indicator.id}
              style={[
                styles.checkboxRow,
                isSelected && styles.checkboxRowSelected,
              ]}
              onPress={() => toggleIndicator(indicator.id)}
            >
              <View
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
              />
              <Text style={styles.label}>{indicator.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <SurfaceCard>
        <Text style={styles.note}>
          DiaMom membantu edukasi dan dukungan. Ikuti arahan bidan atau tenaga
          kesehatan, dan hentikan bila merasa tidak aman atau tidak nyaman.
        </Text>
      </SurfaceCard>

      {error ? (
        <SurfaceCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </SurfaceCard>
      ) : null}

      <ActionButton
        accessibilityLabel="Mulai setelah semua indikator keamanan dicentang"
        disabled={!canStart}
        label={isSaving ? "Menyimpan..." : "Mulai"}
        onPress={handleSave}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    gap: 12,
    backgroundColor: diamomTheme.colors.surface,
  },
  checkboxRowSelected: {
    borderColor: diamomTheme.colors.primary,
    backgroundColor: diamomTheme.colors.primaryMuted,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: diamomTheme.colors.textSoft,
  },
  checkboxSelected: {
    backgroundColor: diamomTheme.colors.primary,
    borderColor: diamomTheme.colors.primary,
  },
  label: {
    fontSize: 16,
    color: diamomTheme.colors.text,
    flex: 1,
    lineHeight: 22,
  },
  note: { color: diamomTheme.colors.mutedText, fontSize: 14, lineHeight: 21 },
  errorCard: {
    borderColor: diamomTheme.colors.danger,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
  },
});
