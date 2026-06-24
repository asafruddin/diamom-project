import { router } from "expo-router";

import { ActionButton, DiaScreen, PageHeader } from "@/components/dia-ui";
import {
  MaterialIllustrationHero,
  PrevNextMaterialNav,
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

      {CLOSING_DETAIL.heroImage ? (
        <MaterialIllustrationHero
          accessibilityLabel={CLOSING_DETAIL.title}
          source={CLOSING_DETAIL.heroImage}
        />
      ) : null}

      <ActionButton
        accessibilityLabel="Mulai penilaian VAS"
        label="Mulai Penilaian VAS"
        onPress={() => router.push("/(tabs)/vas")}
      />

      <PrevNextMaterialNav {...navigation} />
    </DiaScreen>
  );
}
