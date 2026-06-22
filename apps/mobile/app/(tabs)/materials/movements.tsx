import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  MaterialIllustration,
  MaterialIllustrationHero,
  PrevNextMaterialNav,
  SafetyNoticeCard,
  SectionChipRow,
} from "@/features/materials/material-components";
import {
  LABOR_DANCE_MOVEMENTS,
  MOVEMENTS_DETAIL,
  getMaterialNavigation,
} from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

const materialHref = "/(tabs)/materials/movements" as const;

export default function LaborDanceMovementsScreen() {
  const navigation = getMaterialNavigation(materialHref);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow={MOVEMENTS_DETAIL.eyebrow}
        showBack
        title={MOVEMENTS_DETAIL.title}
        description={MOVEMENTS_DETAIL.description}
      />

      {MOVEMENTS_DETAIL.heroImage && (
        <MaterialIllustrationHero
          accessibilityLabel={MOVEMENTS_DETAIL.title}
          source={MOVEMENTS_DETAIL.heroImage}
        />
      )}

      <MaterialHero
        detail={MOVEMENTS_DETAIL.heroDetail}
        iconName={MOVEMENTS_DETAIL.heroIconName}
        readTime={MOVEMENTS_DETAIL.readTime}
        title={MOVEMENTS_DETAIL.heroTitle}
      />

      <SectionChipRow
        sections={[
          ...MOVEMENTS_DETAIL.sections.map((section) => section.title),
          "Pengingat aman",
          ...LABOR_DANCE_MOVEMENTS.map((movement) => movement.title),
        ]}
      />

      {MOVEMENTS_DETAIL.sections.map((section) => (
        <LearningSectionCard
          body={section.body}
          bullets={section.bullets}
          iconName={section.iconName}
          key={section.id}
          title={section.title}
          tone={section.tone}
        />
      ))}

      <SafetyNoticeCard items={MOVEMENTS_DETAIL.safetyNotes} />

      <View style={styles.list}>
        {LABOR_DANCE_MOVEMENTS.map((movement, index) => (
          <Pressable
            accessibilityLabel={`Buka detail gerakan ${movement.title}`}
            accessibilityRole="button"
            key={movement.slug}
            onPress={() =>
              router.push({
                params: { slug: movement.slug },
                pathname: "/(tabs)/materials/movement/[slug]",
              })
            }
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <SurfaceCard style={styles.movementCard}>
              <View style={styles.movementTopRow}>
                <MaterialIllustration
                  accessibilityLabel={movement.title}
                  source={movement.illustration}
                  variant="thumbnail"
                />
                <View style={styles.movementTextBlock}>
                  <Text style={styles.movementTitle}>{movement.title}</Text>
                  <Text style={styles.body}>{movement.summary}</Text>
                </View>
                <Ionicons
                  color={diamomTheme.colors.textSoft}
                  name="chevron-forward"
                  size={20}
                />
              </View>
              <View style={styles.metaGrid}>
                <InfoMeta iconName="speedometer" label={movement.difficulty} />
                <InfoMeta iconName="cube" label={movement.equipment} />
                <InfoMeta iconName="people" label={movement.companion} />
              </View>
            </SurfaceCard>
          </Pressable>
        ))}
      </View>

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}

function InfoMeta({
  iconName,
  label,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.metaItem}>
      <Ionicons
        color={diamomTheme.colors.primaryStrong}
        name={iconName}
        size={15}
      />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: diamomTheme.spacing.md,
  },
  movementCard: {
    gap: diamomTheme.spacing.md,
  },
  movementTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  movementTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  movementTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
  },
  body: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: diamomTheme.spacing.sm,
  },
  metaItem: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  metaText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 12,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.86,
  },
});
