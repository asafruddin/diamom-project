import { StyleSheet, View } from "react-native";

import { DiaScreen, PageHeader } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  MaterialIllustrationHero,
  PrevNextMaterialNav,
  SafetyNoticeCard,
  SectionChipRow,
  StepTimelineCard,
} from "@/features/materials/material-components";
import {
  SOP_DETAIL,
  SOP_STEPS,
  getMaterialNavigation,
} from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

const materialHref = "/(tabs)/materials/sop" as const;

export default function SopLaborDanceScreen() {
  const navigation = getMaterialNavigation(materialHref);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow={SOP_DETAIL.eyebrow}
        showBack
        title={SOP_DETAIL.title}
        description={SOP_DETAIL.description}
      />

      {SOP_DETAIL.heroImage && (
        <MaterialIllustrationHero
          accessibilityLabel={SOP_DETAIL.title}
          source={SOP_DETAIL.heroImage}
        />
      )}

      <MaterialHero
        detail={SOP_DETAIL.heroDetail}
        iconName={SOP_DETAIL.heroIconName}
        readTime={SOP_DETAIL.readTime}
        title={SOP_DETAIL.heroTitle}
      />

      <SectionChipRow
        sections={[
          ...SOP_DETAIL.sections.map((section) => section.title),
          ...SOP_STEPS.map((step) => step.title),
          "Pengingat aman",
        ]}
      />

      {SOP_DETAIL.sections.map((section) => (
        <LearningSectionCard
          body={section.body}
          bullets={section.bullets}
          iconName={section.iconName}
          key={section.id}
          title={section.title}
          tone={section.tone}
        />
      ))}

      <View style={styles.timelineList}>
        {SOP_STEPS.map((step) => (
          <StepTimelineCard
            description={step.description}
            key={step.id}
            step={step.step}
            steps={step.bullets}
            title={step.title}
          />
        ))}
      </View>

      <SafetyNoticeCard items={SOP_DETAIL.safetyNotes} title="Pengingat aman" />

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  timelineList: {
    gap: diamomTheme.spacing.md,
  },
});
