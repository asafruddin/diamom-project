import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";

import {
    ActionButton,
    BulletList,
    DiaScreen,
    IllustrationPanel,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { getMovementBySlug } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function LaborDanceMovementDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const movement = getMovementBySlug(slug);

  if (!movement) {
    return (
      <DiaScreen>
        <PageHeader
          eyebrow="Gerakan"
          showBack
          title="Gerakan tidak ditemukan"
          description="Silakan kembali ke daftar gerakan dan pilih materi lainnya."
        />
        <ActionButton
          label="Kembali ke Gerakan"
          onPress={() => router.replace("/(tabs)/materials/movements")}
        />
      </DiaScreen>
    );
  }

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Detail Gerakan"
        showBack
        title={movement.title}
        description={movement.summary}
      />

      <IllustrationPanel
        badge="GD"
        title="Lakukan dengan ritme pelan sambil menjaga napas tetap stabil."
        detail="Gerakan dapat dihentikan kapan saja jika tubuh terasa tidak aman atau tidak nyaman."
      />

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Cara melakukan</Text>
        <BulletList items={movement.steps} />
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Manfaat</Text>
        <BulletList items={movement.benefits} />
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>Perhatian</Text>
        <Text style={styles.body}>{movement.caution}</Text>
      </SurfaceCard>

      <ActionButton
        label="Lanjut ke Penilaian VAS"
        onPress={() => router.push("/(tabs)/vas")}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
