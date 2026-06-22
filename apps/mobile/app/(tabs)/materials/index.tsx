import { StyleSheet, View } from "react-native";

import { DiaScreen, PageHeader } from "@/components/dia-ui";
import { MaterialHero, MaterialModuleCard } from "@/features/materials/material-components";
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

      <MaterialHero
        detail="Baca secara bertahap, mulai dari konsep, SOP, napas, gerakan, lalu penutup. Semua materi tersedia offline."
        iconName="book"
        readTime="20 menit"
        title="Belajar dengan alur pendek agar tubuh dan pikiran tetap nyaman."
      />

      <View style={styles.list}>
        {MATERIAL_ITEMS.map((item) => (
          <MaterialModuleCard
            description={item.description}
            href={item.href}
            iconName={item.iconName}
            key={item.id}
            readTime={item.readTime}
            step={item.step}
            title={item.title}
            thumbnail={item.thumbnail}
          />
        ))}
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.sm,
  },
});
