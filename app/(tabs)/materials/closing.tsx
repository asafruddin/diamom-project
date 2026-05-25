import { router } from "expo-router";

import { ActionButton, DiaScreen, PageHeader } from "@/components/dia-ui";
import {
  LearningSectionCard,
  MaterialHero,
  PrevNextMaterialNav,
  SafetyNoticeCard,
  SectionChipRow,
} from "@/features/materials/material-components";
import {
  CLOSING_DETAIL,
  getMaterialNavigation,
} from "@/features/materials/materials-content";

const materialHref = "/(tabs)/materials/closing" as const;

export default function ClosingScreen() {
  const navigation = getMaterialNavigation(materialHref);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow={CLOSING_DETAIL.eyebrow}
        showBack
        title={CLOSING_DETAIL.title}
        description={CLOSING_DETAIL.description}
      />

      <MaterialHero
        detail={CLOSING_DETAIL.heroDetail}
        iconName={CLOSING_DETAIL.heroIconName}
        readTime={CLOSING_DETAIL.readTime}
        title={CLOSING_DETAIL.heroTitle}
      />

      <SectionChipRow
        sections={[
          ...CLOSING_DETAIL.sections.map((section) => section.title),
          "Pengingat aman",
        ]}
      />

      {CLOSING_DETAIL.sections.map((section) => (
        <LearningSectionCard
          body={section.body}
          bullets={section.bullets}
          iconName={section.iconName}
          key={section.id}
          title={section.title}
          tone={section.tone}
        />
      ))}

      <SafetyNoticeCard items={CLOSING_DETAIL.safetyNotes} title="Pengingat aman" />

      <ActionButton
        accessibilityLabel="Mulai penilaian VAS"
        label="Mulai Penilaian VAS"
        onPress={() => router.push("/(tabs)/vas")}
      />

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}
