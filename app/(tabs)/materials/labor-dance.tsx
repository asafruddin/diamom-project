import { StyleSheet, View } from "react-native";

import { DiaScreen, PageHeader } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  PrevNextMaterialNav,
  SafetyNoticeCard,
  SectionChipRow,
  StepTimelineCard,
} from "@/features/materials/material-components";
import {
  LABOR_DANCE_DETAIL,
  getMaterialNavigation,
} from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

const materialHref = "/(tabs)/materials/labor-dance" as const;

export default function LaborDanceExplanationScreen() {
  const navigation = getMaterialNavigation(materialHref);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow={LABOR_DANCE_DETAIL.eyebrow}
        showBack
        title={LABOR_DANCE_DETAIL.title}
        description={LABOR_DANCE_DETAIL.description}
      />

      <MaterialHero
        detail={LABOR_DANCE_DETAIL.heroDetail}
        iconName={LABOR_DANCE_DETAIL.heroIconName}
        readTime={LABOR_DANCE_DETAIL.readTime}
        title={LABOR_DANCE_DETAIL.heroTitle}
      />

      <SectionChipRow
        sections={[
          ...LABOR_DANCE_DETAIL.sections.map((section) => section.title),
          "Jangan lanjutkan",
          "Rangkaian gerakan",
        ]}
      />

      {LABOR_DANCE_DETAIL.sections.map((section) => (
        <LearningSectionCard
          body={section.body}
          bullets={section.bullets}
          iconName={section.iconName}
          key={section.id}
          title={section.title}
          tone={section.tone}
        />
      ))}

      <SafetyNoticeCard items={LABOR_DANCE_DETAIL.safetyNotes} />

      <View style={styles.timelineList}>
        {LABOR_DANCE_DETAIL.movementGroups?.map((group) => (
          <StepTimelineCard
            description={group.description}
            key={group.id}
            step={group.step}
            steps={group.steps}
            title={group.title}
          />
        ))}
      </View>

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  timelineList: {
    gap: diamomTheme.spacing.md,
  },
});
