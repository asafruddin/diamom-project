import { StyleSheet, Text, View } from "react-native";

import { DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
import { SOP_STEPS } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function SopLaborDanceScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi 2"
        showBack
        title="SOP Labor Dance"
        description="Urutan singkat ini membantu sesi berjalan lebih terarah dan tetap claim-safe."
      />

      <View style={styles.list}>
        {SOP_STEPS.map((step) => (
          <SurfaceCard key={step.id} style={styles.stepCard}>
            <Text style={styles.stepNumber}>
              {step.step}. {step.title}
            </Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </SurfaceCard>
        ))}
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: diamomTheme.spacing.md,
  },
  stepCard: {
    gap: diamomTheme.spacing.sm,
  },
  stepNumber: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  stepDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
