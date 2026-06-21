import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { CLAIM_SAFE_COPY } from "@/constants/claim-safe-copy";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function OnboardingConsentScreen() {
  const acceptDisclaimer = useProfileStore((state) => state.acceptDisclaimer);
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!isAccepted) {
      setError(
        "Anda harus menyetujui pernyataan medis ini untuk menggunakan fitur aktivitas DiaMom.",
      );
      return;
    }

    acceptDisclaimer();
    router.push("/onboarding/profile");
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Persetujuan"
        showBack
        title="Pernyataan Medis"
        description="Harap baca dan pahami batasan penggunaan aplikasi ini sebelum memakai fitur latihan."
      />

      <SurfaceCard style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          {CLAIM_SAFE_COPY.MEDICAL_DISCLAIMER}
        </Text>
        <Text style={styles.disclaimerText}>
          {CLAIM_SAFE_COPY.SUPPORT_POSITIONING}
        </Text>
      </SurfaceCard>

      {error ? (
        <SurfaceCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </SurfaceCard>
      ) : null}

      <SurfaceCard style={styles.switchCard}>
        <View style={styles.switchGroup}>
          <Text style={styles.label}>
            Saya mengerti dan menyetujui pernyataan medis di atas.
          </Text>
          <Switch value={isAccepted} onValueChange={setIsAccepted} />
        </View>
      </SurfaceCard>

      <ActionButton label="Setuju & Lanjutkan" onPress={handleSave} />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  disclaimerBox: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    gap: 12,
  },
  disclaimerText: {
    fontSize: 15,
    lineHeight: 22,
    color: diamomTheme.colors.text,
  },
  errorCard: {
    backgroundColor: "#FFF0F3",
    borderColor: diamomTheme.colors.danger,
  },
  errorText: { color: diamomTheme.colors.danger, fontSize: 14, lineHeight: 20 },
  switchCard: { backgroundColor: diamomTheme.colors.surface },
  switchGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: diamomTheme.colors.text,
    flex: 1,
    lineHeight: 22,
  },
});
