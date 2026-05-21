import { router } from "expo-router";
import { StyleSheet } from "react-native";

import {
  DiaScreen,
  IllustrationPanel,
  ListRowCard,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { HOME_SHORTCUTS } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function HomeDashboardScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Menu Utama"
        title="Halo, Ibu Hebat!"
        description="Mari persiapkan persalinan yang sehat dan nyaman dengan materi, gerakan, dan pemantauan VAS sederhana."
      />

      <IllustrationPanel
        badge="DM"
        title="Persiapan persalinan yang lembut, aman, dan terarah."
        detail="DiaMom membantu Anda belajar, bergerak, dan memantau kenyamanan diri secara mandiri."
      />

      <SurfaceCard style={styles.cardGroup}>
        {HOME_SHORTCUTS.map((shortcut) => (
          <ListRowCard
            description={shortcut.description}
            key={shortcut.id}
            onPress={() => router.push(shortcut.href)}
            step={shortcut.step}
            title={shortcut.title}
          />
        ))}
      </SurfaceCard>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  cardGroup: {
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.sm,
  },
});
