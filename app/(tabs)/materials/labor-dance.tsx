import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";

import {
    ActionButton,
    BulletList,
    DiaScreen,
    IllustrationPanel,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { LABOR_DANCE_OVERVIEW } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function LaborDanceExplanationScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi 1"
        showBack
        title={LABOR_DANCE_OVERVIEW.title}
        description="Pahami tujuan Labor Dance sebelum mulai mempelajari SOP dan gerakannya."
      />

      <IllustrationPanel
        badge="LD"
        title="Gerak ritmis yang membantu ibu tetap fokus pada napas dan kenyamanan diri."
        detail="Lakukan dengan lembut dan tetap berhenti bila tubuh terasa tidak aman atau tidak nyaman."
      />

      <SurfaceCard>
        <Text style={styles.body}>{LABOR_DANCE_OVERVIEW.body}</Text>
        <BulletList items={LABOR_DANCE_OVERVIEW.benefits} />
      </SurfaceCard>

      <ActionButton
        label="Buka SOP Labor Dance"
        onPress={() => router.push("/(tabs)/materials/sop")}
        variant="secondary"
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
