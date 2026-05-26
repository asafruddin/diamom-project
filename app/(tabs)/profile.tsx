import type Ionicons from "@expo/vector-icons/Ionicons";

import IoniconsIcon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { DiaScreen, InfoPill, PageHeader, SurfaceCard } from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { useVasHistoryStore } from "@/features/session/vas-history-store";
import { diamomTheme } from "@/theme";

type SettingsRowProps = {
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  title: string;
  tone?: "default" | "danger";
};

type StatusItemProps = {
  isComplete: boolean;
  label: string;
};

export default function ProfileSettingsScreen() {
  const hasAcceptedDisclaimer = useProfileStore(
    (state) => state.hasAcceptedDisclaimer,
  );
  const hasCompletedSafetyScreening = useProfileStore(
    (state) => state.hasCompletedSafetyScreening,
  );
  const safetyScreening = useProfileStore((state) => state.safetyScreening);
  const clearOnboardingData = useProfileStore(
    (state) => state.clearOnboardingData,
  );
  const resetPracticeSession = usePracticeSessionStore(
    (state) => state.resetPracticeSession,
  );
  const clearVasHistory = useVasHistoryStore((state) => state.clearRecords);

  const screeningSummary = !hasCompletedSafetyScreening
    ? "Skrining keamanan belum selesai."
    : safetyScreening?.hasRisk
      ? "Skrining terakhir mencatat kondisi yang perlu diperhatikan."
      : "Skrining terakhir tidak mencatat tanda berisiko.";

  const handleRetakeScreening = () => {
    router.push("/onboarding/safety-screening");
  };

  const handleDeleteLocalData = () => {
    Alert.alert(
      "Hapus data lokal?",
      "Tindakan ini menghapus status persetujuan, skrining keamanan, sesi VAS sementara, dan riwayat VAS di perangkat ini. Anda akan kembali ke onboarding.",
      [
        {
          style: "cancel",
          text: "Batal",
        },
        {
          onPress: () => {
            resetPracticeSession();
            clearVasHistory();
            clearOnboardingData();
            router.replace("/onboarding/intro");
          },
          style: "destructive",
          text: "Hapus",
        },
      ],
    );
  };

  return (
    <DiaScreen contentContainerStyle={styles.container}>
      <PageHeader
        eyebrow="Pengaturan"
        title="Profil & Pengaturan"
        description="Kelola akses, materi, dan data lokal DiaMom tanpa membuat akun atau menyimpan profil pribadi."
      />

      <SurfaceCard style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.avatar}>
            <IoniconsIcon
              color={diamomTheme.colors.onPrimary}
              name="person"
              size={34}
            />
          </View>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>Mode anonim aktif</Text>
            <Text style={styles.heroDescription}>
              DiaMom tidak meminta nama, kontak darurat, minggu kehamilan, atau
              akun pengguna.
            </Text>
          </View>
        </View>
        <View style={styles.pillRow}>
          <InfoPill label="Lokal di perangkat" />
          <InfoPill label="Bahasa Indonesia" />
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.statusCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status akses</Text>
          <Text style={styles.sectionDescription}>{screeningSummary}</Text>
        </View>
        <StatusItem
          isComplete={hasAcceptedDisclaimer}
          label="Pernyataan medis disetujui"
        />
        <StatusItem
          isComplete={hasCompletedSafetyScreening}
          label="Skrining keamanan selesai"
        />
      </SurfaceCard>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>Pengaturan utama</Text>
        <SettingsRow
          description="Baca ulang batas penggunaan DiaMom sebagai teman edukasi dan dukungan."
          iconName="document-text"
          onPress={() => router.push("/settings/terms")}
          title="Pernyataan Medis & Ketentuan"
        />
        <SettingsRow
          description="Perbarui kondisi keamanan sebelum membuka latihan atau materi gerak."
          iconName="shield-checkmark"
          onPress={handleRetakeScreening}
          title="Ulangi Skrining Keamanan"
        />
      </View>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>Akses cepat</Text>
        <SettingsRow
          description="Buka kembali penjelasan, SOP, napas, dan gerakan Labor Dance."
          iconName="book"
          onPress={() => router.push("/(tabs)/materials")}
          title="Daftar Materi"
        />
        <SettingsRow
          description="Catat kenyamanan diri sebelum atau sesudah sesi."
          iconName="stats-chart"
          onPress={() => router.push("/(tabs)/vas")}
          title="Penilaian VAS"
        />
        <SettingsRow
          description="Lihat nilai VAS sebelum, setelah, dan waktu penyimpanan lokal."
          iconName="time"
          onPress={() => router.push("/(tabs)/vas/history")}
          title="Riwayat VAS"
        />
      </View>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>Privasi & data</Text>
        <SettingsRow
          description="Hapus status onboarding, sesi sementara, dan riwayat VAS dari perangkat ini."
          iconName="trash"
          onPress={handleDeleteLocalData}
          title="Hapus Data Lokal"
          tone="danger"
        />
      </View>
    </DiaScreen>
  );
}

function SettingsRow({
  description,
  iconName,
  onPress,
  title,
  tone = "default",
}: SettingsRowProps) {
  const isDanger = tone === "danger";

  return (
    <Pressable
      accessibilityLabel={title}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <SurfaceCard style={[styles.rowCard, isDanger && styles.dangerRowCard]}>
        <View style={[styles.rowIcon, isDanger && styles.dangerIcon]}>
          <IoniconsIcon
            color={
              isDanger
                ? diamomTheme.colors.danger
                : diamomTheme.colors.primaryStrong
            }
            name={iconName}
            size={22}
          />
        </View>
        <View style={styles.rowTextBlock}>
          <Text style={[styles.rowTitle, isDanger && styles.dangerText]}>
            {title}
          </Text>
          <Text style={styles.rowDescription}>{description}</Text>
        </View>
        <IoniconsIcon
          color={
            isDanger ? diamomTheme.colors.danger : diamomTheme.colors.textSoft
          }
          name="chevron-forward"
          size={20}
        />
      </SurfaceCard>
    </Pressable>
  );
}

function StatusItem({ isComplete, label }: StatusItemProps) {
  return (
    <View style={styles.statusRow}>
      <View
        style={[
          styles.statusIcon,
          isComplete ? styles.statusIconComplete : styles.statusIconPending,
        ]}
      >
        <IoniconsIcon
          color={
            isComplete
              ? diamomTheme.colors.primaryStrong
              : diamomTheme.colors.textSoft
          }
          name={isComplete ? "checkmark" : "ellipse-outline"}
          size={18}
        />
      </View>
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: diamomTheme.spacing.xxl,
  },
  heroCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    gap: diamomTheme.spacing.md,
    overflow: "hidden",
  },
  heroTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.lg,
    height: 74,
    justifyContent: "center",
    width: 74,
  },
  heroTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  heroTitle: {
    color: diamomTheme.colors.text,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  heroDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: diamomTheme.spacing.sm,
  },
  statusCard: {
    gap: diamomTheme.spacing.md,
  },
  sectionHeader: {
    gap: diamomTheme.spacing.xs,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  statusRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  statusIcon: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.pill,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  statusIconComplete: {
    backgroundColor: diamomTheme.colors.success,
  },
  statusIconPending: {
    backgroundColor: diamomTheme.colors.primaryMuted,
  },
  statusLabel: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  menuGroup: {
    gap: diamomTheme.spacing.sm,
  },
  groupTitle: {
    color: diamomTheme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginLeft: diamomTheme.spacing.xs,
  },
  rowCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    minHeight: 92,
  },
  dangerRowCard: {
    borderColor: diamomTheme.colors.danger,
  },
  rowIcon: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  dangerIcon: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
  },
  rowTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  rowTitle: {
    color: diamomTheme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  dangerText: {
    color: diamomTheme.colors.danger,
  },
  rowDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.86,
  },
});
