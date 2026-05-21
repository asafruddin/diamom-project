import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    InfoPill,
    ListRowCard,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { diamomTheme } from "@/theme";

export default function ProfileSettingsScreen() {
  const clearOnboardingData = useProfileStore(
    (state) => state.clearOnboardingData,
  );

  const handleReset = () => {
    clearOnboardingData();
    router.replace("/onboarding/intro");
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Profil"
        title="Profil & Pengaturan"
        description="Tab ini menampilkan pengaturan sederhana tanpa menyimpan nama, usia kehamilan, atau kontak pribadi Anda."
      />

      <SurfaceCard style={styles.card}>
        <InfoPill label="Mode anonim aktif" />
        <Text style={styles.body}>
          DiaMom hanya menyimpan status persetujuan medis, skrining keamanan,
          dan nilai VAS di perangkat Anda.
        </Text>
      </SurfaceCard>

      <ListRowCard
        description="Baca kembali pernyataan medis, ketentuan penggunaan, dan posisi DiaMom."
        onPress={() => router.push("/settings/terms")}
        step="01"
        title="Pernyataan Medis & Ketentuan"
      />

      <ListRowCard
        description="Mulai ulang alur persetujuan dan skrining keamanan kapan pun diperlukan."
        onPress={handleReset}
        step="02"
        title="Ulangi Onboarding"
      />

      <View style={styles.buttonWrap}>
        <ActionButton
          label="Buka Daftar Materi"
          onPress={() => router.push("/(tabs)/materials")}
          variant="secondary"
        />
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: diamomTheme.spacing.sm,
  },
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  buttonWrap: {
    marginTop: diamomTheme.spacing.sm,
  },
});
