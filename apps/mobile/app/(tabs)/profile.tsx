import type Ionicons from "@expo/vector-icons/Ionicons";

import IoniconsIcon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { DiaScreen, InfoPill, PageHeader, SurfaceCard } from "@/components/dia-ui";
import { DilationSelector, FormField } from "@/components/forms";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { useResearchSyncStore } from "@/features/research/research-sync-store";
import {
  type PregnancyProgressFormValues,
  validatePregnancyProgress,
} from "@/features/onboarding/validation";
import { usePracticeSessionStore } from "@/features/session/session-store";
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

type IdentityDetailProps = {
  label: string;
  value: string;
};

export default function ProfileSettingsScreen() {
  const hasAcceptedDisclaimer = useProfileStore(
    (state) => state.hasAcceptedDisclaimer,
  );
  const hasCompletedSafetyScreening = useProfileStore(
    (state) => state.hasCompletedSafetyScreening,
  );
  const hasCompletedMotherIdentity = useProfileStore(
    (state) => state.hasCompletedMotherIdentity,
  );
  const motherIdentity = useProfileStore((state) => state.motherIdentity);
  const updatePregnancyProgress = useProfileStore(
    (state) => state.updatePregnancyProgress,
  );
  const safetyScreening = useProfileStore((state) => state.safetyScreening);
  const hasResearchConsent = useResearchSyncStore(
    (state) => state.hasResearchConsent,
  );
  const researchStudyId = useResearchSyncStore((state) => state.studyId);
  const researchLastSyncError = useResearchSyncStore(
    (state) => state.lastSyncError,
  );
  const researchLastSyncedAt = useResearchSyncStore(
    (state) => state.lastSyncedAt,
  );
  const refreshResearchState = useResearchSyncStore((state) => state.resetResearchSync);
  const resetPracticeSession = usePracticeSessionStore(
    (state) => state.resetPracticeSession,
  );
  const deleteParticipantData = useProfileStore(
    (state) => state.deleteParticipantData,
  );
  const [isEditingPregnancy, setIsEditingPregnancy] = useState(false);
  const [pregnancyDraft, setPregnancyDraft] =
    useState<PregnancyProgressFormValues>({
      dilationCm: null,
      pregnancyWeek: "",
    });
  const [pregnancyErrors, setPregnancyErrors] = useState<
    Record<keyof PregnancyProgressFormValues, string | undefined>
  >({
    dilationCm: undefined,
    pregnancyWeek: undefined,
  });

  const screeningSummary = !hasCompletedSafetyScreening
    ? "Skrining keamanan belum selesai."
    : safetyScreening?.hasRisk
      ? "Skrining terakhir belum memenuhi semua indikator keamanan."
      : "Semua indikator keamanan terakhir sudah terpenuhi.";

  const handleRetakeScreening = () => {
    router.push("/onboarding/safety-screening");
  };

  const handleStartEditPregnancy = () => {
    if (!motherIdentity) {
      router.push("/onboarding/profile");
      return;
    }

    setPregnancyDraft({
      dilationCm: motherIdentity.dilationCm,
      pregnancyWeek: String(motherIdentity.pregnancyWeek),
    });
    setPregnancyErrors({
      dilationCm: undefined,
      pregnancyWeek: undefined,
    });
    setIsEditingPregnancy(true);
  };

  const handleCancelEditPregnancy = () => {
    setIsEditingPregnancy(false);
    setPregnancyErrors({
      dilationCm: undefined,
      pregnancyWeek: undefined,
    });
  };

  const updatePregnancyDraft = (
    key: keyof PregnancyProgressFormValues,
    value: string | number | null,
  ) => {
    setPregnancyDraft((current) => ({ ...current, [key]: value }));
    setPregnancyErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSavePregnancyProgress = async () => {
    const result = validatePregnancyProgress(pregnancyDraft);
    setPregnancyErrors(result.errors);

    if (!result.isValid) {
      return;
    }

    await updatePregnancyProgress(result.value);
    setIsEditingPregnancy(false);
  };

  const handleDeleteLocalData = () => {
    Alert.alert(
      "Hapus data peserta?",
      "Tindakan ini menghapus identitas ibu, status persetujuan, skrining keamanan, dan riwayat VAS dari database DiaMom. Anda akan kembali ke onboarding.",
      [
        {
          style: "cancel",
          text: "Batal",
        },
        {
          onPress: async () => {
            resetPracticeSession();
            await deleteParticipantData();
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
        description="Kelola akses, materi, dan data peserta DiaMom yang tersimpan di database."
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
            <Text style={styles.heroTitle}>Data peserta aktif</Text>
            <Text style={styles.heroDescription}>
              Identitas ibu dan catatan DiaMom tersimpan di database DiaMom
              melalui sesi peserta anonim.
            </Text>
          </View>
        </View>
        <View style={styles.pillRow}>
          <InfoPill label="Tersimpan di database" />
          <InfoPill label="Bahasa Indonesia" />
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.identityCard}>
        <View style={styles.identityHeaderRow}>
          <View style={[styles.sectionHeader, styles.identityHeaderContent]}>
            <Text style={styles.sectionTitle}>Identitas ibu</Text>
            <Text style={styles.sectionDescription}>
              Data ini tersimpan di database DiaMom dan dimuat kembali setiap
              kali sesi peserta dibuka.
            </Text>
          </View>
          <Pressable
            accessibilityLabel={
              motherIdentity
                ? "Edit usia kehamilan dan pembukaan"
                : "Isi identitas ibu"
            }
            accessibilityRole="button"
            onPress={handleStartEditPregnancy}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <IoniconsIcon
              color={diamomTheme.colors.primaryStrong}
              name={motherIdentity ? "create-outline" : "add"}
              size={18}
            />
            <Text style={styles.editButtonText}>
              {motherIdentity ? "Edit" : "Isi"}
            </Text>
          </Pressable>
        </View>

        {motherIdentity ? (
          <>
            <View style={styles.identityGrid}>
              <IdentityDetail label="Nama" value={motherIdentity.motherName} />
              <IdentityDetail
                label="Umur"
                value={`${motherIdentity.age} tahun`}
              />
              <IdentityDetail label="GPA" value={motherIdentity.gpa} />
              <IdentityDetail
                label="Usia Kehamilan"
                value={`${motherIdentity.pregnancyWeek} minggu`}
              />
              <IdentityDetail
                label="Pembukaan"
                value={`${motherIdentity.dilationCm} cm`}
              />
            </View>

            {isEditingPregnancy ? (
              <View style={styles.editorBlock}>
                <FormField
                  accessibilityLabel="Usia Kehamilan"
                  error={pregnancyErrors.pregnancyWeek}
                  keyboardType="number-pad"
                  label="Usia Kehamilan"
                  onChangeText={(text) =>
                    updatePregnancyDraft("pregnancyWeek", text)
                  }
                  placeholder="Minggu"
                  rightLabel="minggu"
                  value={pregnancyDraft.pregnancyWeek}
                />

                <DilationSelector
                  error={pregnancyErrors.dilationCm}
                  onChange={(value) =>
                    updatePregnancyDraft("dilationCm", value)
                  }
                  value={pregnancyDraft.dilationCm}
                />

                <View style={styles.editorActions}>
                  <Pressable
                    accessibilityLabel="Batal edit usia kehamilan dan pembukaan"
                    accessibilityRole="button"
                    onPress={handleCancelEditPregnancy}
                    style={({ pressed }) => [
                      styles.secondaryAction,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.secondaryActionText}>Batal</Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel="Simpan usia kehamilan dan pembukaan"
                    accessibilityRole="button"
                    onPress={handleSavePregnancyProgress}
                    style={({ pressed }) => [
                      styles.primaryAction,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.primaryActionText}>Simpan</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <Text style={styles.emptyIdentityText}>
            Identitas ibu belum tersedia. Isi data terlebih dahulu sebelum
            memakai fitur latihan DiaMom.
          </Text>
        )}
      </SurfaceCard>

      <SurfaceCard style={styles.statusCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status akses</Text>
          <Text style={styles.sectionDescription}>{screeningSummary}</Text>
        </View>
        <StatusItem
          isComplete={hasCompletedMotherIdentity}
          label="Identitas ibu tersimpan di database"
        />
        <StatusItem
          isComplete={hasAcceptedDisclaimer}
          label="Pernyataan medis disetujui"
        />
        <StatusItem
          isComplete={hasCompletedSafetyScreening}
          label="Skrining keamanan selesai"
        />
      </SurfaceCard>

      <SurfaceCard style={styles.researchCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sinkronisasi penelitian</Text>
          <Text style={styles.sectionDescription}>
            {hasResearchConsent
              ? "Data penelitian yang Anda setujui dapat dikirim ke dashboard peneliti melalui Neon."
              : "Aktifkan persetujuan bila Anda ingin mengirim data penelitian ke dashboard peneliti."}
          </Text>
        </View>
        <StatusItem
          isComplete={hasResearchConsent}
          label={
            hasResearchConsent
              ? `Persetujuan aktif • Study ID ${researchStudyId ?? "-"}`
              : "Persetujuan penelitian belum aktif"
          }
        />
        <StatusItem
          isComplete={true}
          label="Penulisan data peserta langsung ke database aktif"
        />
        <Text style={styles.researchMetaText}>
          {researchLastSyncedAt
            ? `Tersimpan terakhir: ${formatResearchTime(researchLastSyncedAt)}`
            : "Belum ada penyimpanan ke server yang tercatat."}
        </Text>
        {researchLastSyncError ? (
          <Text style={styles.researchErrorText}>{researchLastSyncError}</Text>
        ) : null}
        <View style={styles.researchActions}>
          <Pressable
            accessibilityLabel="Kelola persetujuan sinkronisasi penelitian"
            accessibilityRole="button"
            onPress={() => router.push("/research/consent")}
            style={({ pressed }) => [
              styles.primaryAction,
              styles.researchActionButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.primaryActionText, styles.researchActionText]}>
              {hasResearchConsent ? "Kelola Persetujuan" : "Aktifkan Persetujuan"}
            </Text>
          </Pressable>
          <Pressable
            accessibilityLabel="Muat ulang status data penelitian"
            accessibilityRole="button"
            onPress={() => {
              void refreshResearchState();
            }}
            style={({ pressed }) => [
              styles.secondaryAction,
              styles.researchActionButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.secondaryActionText, styles.researchActionText]}>
              Muat Ulang Data
            </Text>
          </Pressable>
        </View>
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
          description="Lihat nilai VAS sebelum, setelah, dan waktu penyimpanan dari database."
          iconName="time"
          onPress={() => router.push("/(tabs)/vas/history")}
          title="Riwayat VAS"
        />
      </View>

      <View style={styles.menuGroup}>
        <Text style={styles.groupTitle}>Privasi & data</Text>
        <SettingsRow
          description="Hapus status onboarding, sesi sementara, dan riwayat VAS dari database DiaMom."
          iconName="trash"
          onPress={handleDeleteLocalData}
          title="Hapus Data Peserta"
          tone="danger"
        />
      </View>
    </DiaScreen>
  );
}

function IdentityDetail({ label, value }: IdentityDetailProps) {
  return (
    <View style={styles.identityDetail}>
      <Text style={styles.identityLabel}>{label}</Text>
      <Text style={styles.identityValue}>{value}</Text>
    </View>
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

function formatResearchTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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
  identityCard: {
    gap: diamomTheme.spacing.md,
  },
  identityHeaderRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: diamomTheme.spacing.md,
    justifyContent: "space-between",
  },
  identityHeaderContent: {
    flex: 1,
    minWidth: 0,
  },
  editButton: {
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
    minHeight: 40,
    paddingHorizontal: diamomTheme.spacing.md,
  },
  editButtonText: {
    color: diamomTheme.colors.primaryStrong,
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "800",
  },
  identityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: diamomTheme.spacing.sm,
  },
  identityDetail: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.sm,
    borderWidth: 1,
    flexGrow: 1,
    gap: diamomTheme.spacing.xs,
    minHeight: 76,
    minWidth: "47%",
    padding: diamomTheme.spacing.md,
  },
  identityLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 12,
    fontWeight: "800",
  },
  identityValue: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 23,
  },
  emptyIdentityText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  editorBlock: {
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.md,
  },
  editorActions: {
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
    justifyContent: "flex-end",
  },
  secondaryAction: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: diamomTheme.spacing.lg,
  },
  secondaryActionText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.pill,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: diamomTheme.spacing.lg,
  },
  primaryActionText: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  statusCard: {
    gap: diamomTheme.spacing.md,
  },
  researchActions: {
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
    width: "100%",
  },
  researchActionButton: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: diamomTheme.spacing.md,
  },
  researchActionText: {
    flexShrink: 1,
    textAlign: "center",
  },
  researchCard: {
    gap: diamomTheme.spacing.md,
  },
  researchErrorText: {
    color: diamomTheme.colors.danger,
    fontSize: 13,
    lineHeight: 18,
  },
  researchMetaText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
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
