import { router } from "expo-router";

import {
    DiaScreen,
    ListRowCard,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { LABOR_DANCE_MOVEMENTS } from "@/features/materials/materials-content";

export default function LaborDanceMovementsScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi 4"
        showBack
        title="Gerakan Labor Dance"
        description="Pilih gerakan yang ingin Anda pelajari terlebih dahulu."
      />

      <SurfaceCard>
        {LABOR_DANCE_MOVEMENTS.map((movement, index) => (
          <ListRowCard
            description={movement.summary}
            key={movement.slug}
            onPress={() =>
              router.push({
                params: { slug: movement.slug },
                pathname: "/(tabs)/materials/movement/[slug]",
              })
            }
            step={`${index + 1}`}
            title={movement.title}
          />
        ))}
      </SurfaceCard>
    </DiaScreen>
  );
}
