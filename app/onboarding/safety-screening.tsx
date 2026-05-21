import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { SAFETY_WARNING_SIGNS } from "@/constants/safety";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function OnboardingSafetyScreeningScreen() {
  const saveSafetyScreening = useProfileStore(
    (state) => state.saveSafetyScreening,
  );
  const [selectedSigns, setSelectedSigns] = useState<Record<string, boolean>>(
    {},
  );

  const toggleSign = (id: string) => {
    setSelectedSigns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const signs = Object.keys(selectedSigns).filter(
      (key) => selectedSigns[key],
    );
    saveSafetyScreening(signs);
    router.push("/(tabs)/home");
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Skrining"
        showBack
        title="Skrining Keamanan"
        description="Apakah Anda saat ini mengalami atau memiliki kondisi berikut? Pilih semua yang sesuai."
      />

      <View style={styles.list}>
        {SAFETY_WARNING_SIGNS.map((sign) => {
          const isSelected = !!selectedSigns[sign.id];
          return (
            <Pressable
              key={sign.id}
              style={[
                styles.checkboxRow,
                isSelected && styles.checkboxRowSelected,
              ]}
              onPress={() => toggleSign(sign.id)}
            >
              <View
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
              />
              <Text style={styles.label}>{sign.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <SurfaceCard>
        <Text style={styles.note}>
          Jika Anda memilih kondisi berisiko, DiaMom akan tetap membuka materi
          edukasi tetapi membatasi sesi gerak terpandu.
        </Text>
      </SurfaceCard>

      <ActionButton label="Selesai Skrining" onPress={handleSave} />
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
});
