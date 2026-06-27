import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { diamomTheme } from "@/theme";

export default function OnboardingIntroScreen() {
  return (
    <DiaScreen contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Onboarding"
        title="Selamat datang di DiaMom"
        description="Pelajari persiapan persalinan melalui latihan napas, panduan gerak Labor Dance, dan pemantauan kenyamanan diri."
      />

      <SurfaceCard style={styles.heroCard}>
        <View style={styles.imageViewport}>
          <Image
            accessibilityLabel="Ilustrasi panduan persalinan DiaMom"
            contentFit="cover"
            contentPosition="top"
            source={require("@/assets/material/materi-2-sop.png")}
            style={styles.heroImage}
          />
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle}>
            DiaMom hadir sebagai pendamping edukasi, bukan pengganti tenaga
            medis.
          </Text>
          <Text style={styles.heroDetail}>
            Selesaikan persetujuan medis, identitas ibu, dan skrining keamanan
            sebelum menggunakan fitur latihan.
          </Text>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.actionCard}>
        <Text style={styles.actionHint}>
          Akses peneliti tersedia untuk tim studi yang sudah memiliki akun.
        </Text>
        <ActionButton
          accessibilityLabel="Lanjutkan ke persetujuan medis"
          fullWidth
          label="Lanjutkan"
          onPress={() => router.push("/onboarding/consent")}
        />
        <ActionButton
          accessibilityLabel="Masuk sebagai peneliti"
          fullWidth
          label="Masuk sebagai Peneliti"
          onPress={() => router.push("/researcher/login")}
          variant="secondary"
        />
      </SurfaceCard>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: diamomTheme.spacing.xxl,
  },
  heroCard: {
    gap: diamomTheme.spacing.md,
    overflow: "hidden",
    padding: 0,
  },
  imageViewport: {
    aspectRatio: 493 / 454,
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderBottomWidth: 1,
    borderColor: diamomTheme.colors.border,
    overflow: "hidden",
  },
  heroImage: {
    height: "100%",
    width: "100%",
  },
  heroCopy: {
    gap: diamomTheme.spacing.xs,
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingBottom: diamomTheme.spacing.lg,
  },
  heroTitle: {
    color: diamomTheme.colors.text,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  heroDetail: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 23,
  },
  actionCard: {
    gap: diamomTheme.spacing.sm,
  },
  actionHint: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
  },
});
