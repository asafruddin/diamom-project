import { Redirect, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { useResearchSyncStore } from "@/features/research/research-sync-store";
import { diamomTheme } from "@/theme";

export default function ResearchConsentScreen() {
  const motherIdentity = useProfileStore((state) => state.motherIdentity);
  const grantConsent = useResearchSyncStore((state) => state.grantConsent);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!motherIdentity) {
    return <Redirect href="/onboarding/profile" />;
  }

  const handleConsent = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await grantConsent();
      router.back();
    } catch (syncError) {
      setError(
        syncError instanceof Error
          ? syncError.message
          : "Persetujuan penelitian belum berhasil disimpan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Penelitian"
        showBack
        title="Persetujuan Sinkronisasi Penelitian"
        description="Aktifkan hanya jika Anda setuju data penelitian tertentu dikirim ke server Neon untuk dashboard peneliti."
      />

      <SurfaceCard style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Data yang akan disinkronkan</Text>
        <Text style={styles.body}>Study ID yang dibuat aplikasi</Text>
        <Text style={styles.body}>Nama ibu</Text>
        <Text style={styles.body}>Nilai VAS sebelum dan sesudah sesi</Text>
        <Text style={styles.body}>Durasi sesi dan status intervensi</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.noteCard}>
        <Text style={styles.noteText}>
          Data ini digunakan untuk kebutuhan dashboard peneliti. DiaMom tetap
          merupakan aplikasi dukungan dan edukasi, bukan alat diagnosis atau
          pengobatan.
        </Text>
      </SurfaceCard>

      {error ? (
        <SurfaceCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </SurfaceCard>
      ) : null}

      <View style={styles.actions}>
        <ActionButton
          label={isSubmitting ? "Menyimpan..." : "Saya Setuju & Aktifkan"}
          onPress={handleConsent}
        />
        <ActionButton
          label="Batal"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: diamomTheme.spacing.md,
  },
  body: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  errorCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.danger,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    gap: diamomTheme.spacing.sm,
  },
  noteCard: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderColor: diamomTheme.colors.primaryMuted,
  },
  noteText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
});
