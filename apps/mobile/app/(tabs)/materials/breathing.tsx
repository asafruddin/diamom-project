import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  PrevNextMaterialNav,
  SafetyNoticeCard,
  SectionChipRow,
} from "@/features/materials/material-components";
import {
  BREATHING_DETAIL,
  BREATHING_EXERCISES,
  getMaterialNavigation,
} from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

const materialHref = "/(tabs)/materials/breathing" as const;

export default function BreathingExercisesScreen() {
  const navigation = getMaterialNavigation(materialHref);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow={BREATHING_DETAIL.eyebrow}
        showBack
        title={BREATHING_DETAIL.title}
        description={BREATHING_DETAIL.description}
      />

      <MaterialHero
        detail={BREATHING_DETAIL.heroDetail}
        iconName={BREATHING_DETAIL.heroIconName}
        readTime={BREATHING_DETAIL.readTime}
        title={BREATHING_DETAIL.heroTitle}
      />

      <SectionChipRow
        sections={[
          ...BREATHING_DETAIL.sections.map((section) => section.title),
          ...BREATHING_EXERCISES.map((exercise) => exercise.title),
          "Pengingat aman",
        ]}
      />

      {BREATHING_DETAIL.sections.map((section) => (
        <LearningSectionCard
          body={section.body}
          bullets={section.bullets}
          iconName={section.iconName}
          key={section.id}
          title={section.title}
          tone={section.tone}
        />
      ))}

      <View style={styles.list}>
        {BREATHING_EXERCISES.map((exercise) => (
          <SurfaceCard key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseIconWrap}>
                <Ionicons
                  color={diamomTheme.colors.primaryStrong}
                  name="leaf"
                  size={22}
                />
              </View>
              <View style={styles.exerciseTextBlock}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseRhythm}>{exercise.rhythm}</Text>
              </View>
            </View>
            <Text style={styles.body}>{exercise.purpose}</Text>
            <View style={styles.miniPanel}>
              <Text style={styles.miniTitle}>Persiapan</Text>
              <Text style={styles.body}>{exercise.preparation}</Text>
            </View>
            <View style={styles.stepList}>
              {exercise.steps.map((step, index) => (
                <View key={step} style={styles.stepRow}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.body}>{step}</Text>
                </View>
              ))}
            </View>
          </SurfaceCard>
        ))}
      </View>

      <SafetyNoticeCard items={BREATHING_DETAIL.safetyNotes} title="Pengingat aman" />

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: diamomTheme.spacing.md,
  },
  exerciseCard: {
    gap: diamomTheme.spacing.md,
  },
  exerciseHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  exerciseIconWrap: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  exerciseTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  exerciseTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  exerciseRhythm: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  miniPanel: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.sm,
    gap: diamomTheme.spacing.xs,
    padding: diamomTheme.spacing.md,
  },
  miniTitle: {
    color: diamomTheme.colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  stepList: {
    gap: diamomTheme.spacing.sm,
  },
  stepRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  stepNumber: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 22,
    width: 18,
  },
  body: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});
