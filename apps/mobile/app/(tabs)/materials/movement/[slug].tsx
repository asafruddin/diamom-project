import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  MaterialIllustrationHero,
  SafetyNoticeCard,
  StepTimelineCard,
} from "@/features/materials/material-components";
import { getMovementBySlug } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function LaborDanceMovementDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const movement = getMovementBySlug(slug);

  if (!movement) {
    return (
      <DiaScreen>
        <PageHeader
          eyebrow="Gerakan"
          showBack
          title="Gerakan tidak ditemukan"
          description="Silakan kembali ke daftar gerakan dan pilih materi lainnya."
        />
        <ActionButton
          label="Kembali ke Gerakan"
          onPress={() => router.replace("/(tabs)/materials/movements")}
        />
      </DiaScreen>
    );
  }

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Detail Gerakan"
        showBack
        title={movement.title}
        description={movement.summary}
      />

      <MaterialIllustrationHero
        accessibilityLabel={movement.title}
        source={movement.illustration}
      />

      <MaterialHero
        detail={movement.caution}
        iconName="walk"
        readTime={movement.difficulty}
        title="Pelajari pelan-pelan sebelum mencoba gerakan."
      />

      <SurfaceCard style={styles.metaCard}>
        <InfoMeta iconName="speedometer" label="Tingkat" value={movement.difficulty} />
        <InfoMeta iconName="cube" label="Alat bantu" value={movement.equipment} />
        <InfoMeta iconName="people" label="Pendamping" value={movement.companion} />
      </SurfaceCard>

      <LearningSectionCard
        bullets={movement.preparation}
        iconName="checkmark-circle"
        title="Persiapan"
        tone="calm"
      />

      <StepTimelineCard
        description="Ikuti langkah dengan gerakan kecil dan napas yang nyaman."
        step="01"
        steps={movement.steps}
        title="Cara melakukan"
      />

      <LearningSectionCard
        bullets={movement.benefits}
        iconName="heart-circle"
        title="Dukungan kenyamanan"
        tone="support"
      />

      <SafetyNoticeCard items={movement.whenToStop} />
    </DiaScreen>
  );
}

function InfoMeta({
  iconName,
  label,
  value,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metaRow}>
      <View style={styles.metaIcon}>
        <Ionicons
          color={diamomTheme.colors.primaryStrong}
          name={iconName}
          size={18}
        />
      </View>
      <View style={styles.metaTextBlock}>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metaCard: {
    gap: diamomTheme.spacing.md,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  metaIcon: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  metaTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  metaLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 12,
    fontWeight: "800",
  },
  metaValue: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
  },
});
