import { router } from "expo-router";
import { StyleSheet } from "react-native";

import {
    DiaScreen,
    ListRowCard,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { MATERIAL_ITEMS } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function MaterialsListScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi"
        title="Daftar Materi"
        description="Pelajari materi berikut untuk membantu persiapan persalinan yang lebih baik."
      />

      <SurfaceCard style={styles.list}>
        {MATERIAL_ITEMS.map((item) => (
          <ListRowCard
            description={item.description}
            key={item.id}
            onPress={() => router.push(item.href)}
            step={item.step}
            title={item.title}
          />
        ))}
      </SurfaceCard>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.sm,
  },
});
