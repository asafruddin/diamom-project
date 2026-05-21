import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
import { BREATHING_EXERCISES } from "@/features/materials/materials-content";
import { diamomTheme } from "@/theme";

export default function BreathingExercisesScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi 3"
        showBack
        title="Gerakan Pernapasan"
        description="Lakukan pola napas berikut untuk membantu tubuh tetap rileks saat latihan atau kontraksi."
      />

      <View style={styles.list}>
        {BREATHING_EXERCISES.map((exercise) => (
          <SurfaceCard key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <View style={styles.exerciseTextBlock}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseRhythm}>{exercise.rhythm}</Text>
                <Text style={styles.exerciseDescription}>
                  {exercise.description}
                </Text>
              </View>
              <View style={styles.playButton}>
                <Ionicons
                  name="play-circle"
                  size={48}
                  color={diamomTheme.colors.primary}
                />
              </View>
            </View>
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
  exerciseCard: {
    gap: diamomTheme.spacing.xs,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: diamomTheme.spacing.md,
  },
  exerciseTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  playButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  exerciseRhythm: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 14,
    fontWeight: "700",
  },
  exerciseDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
