import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, SurfaceCard } from "@/components/dia-ui";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { formatTimer } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function PracticeSessionScreen() {
  const activityTitle = usePracticeSessionStore((state) => state.activityTitle);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5); // TODO: revert to durationMinutes * 60
  const isDone = secondsLeft === 0;

  useEffect(() => {
    if (beforeScore === null) {
      router.replace("/(tabs)/vas");
    }
  }, [beforeScore]);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setIsRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const handleNext = () => {
    setIsRunning(false);
    router.push("/(tabs)/vas/after");
  };

  return (
    <DiaScreen>
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          Pelaksanaan{"\n"}
          {activityTitle}
        </Text>
      </View>

      <SurfaceCard style={styles.timerCard}>
        <Text style={styles.timer}>{formatTimer(secondsLeft)}</Text>
        <Text style={styles.timerLabel}>Durasi Kegiatan</Text>
      </SurfaceCard>

      <Text style={styles.instruction}>
        Ikuti gerakan dengan nyaman dan fokus pada napas.
      </Text>

      <View style={styles.buttonGroup}>
        {isDone ? (
          <ActionButton
            label="Lanjut ke Penilaian Akhir"
            onPress={handleNext}
          />
        ) : (
          <>
            <ActionButton
              label={isRunning ? "Lanjutkan" : "Mulai"}
              onPress={() => setIsRunning(true)}
            />
            <ActionButton
              label="Jeda"
              onPress={() => setIsRunning(false)}
              variant="secondary"
            />
            <ActionButton
              label="Lanjut ke Penilaian Akhir"
              onPress={handleNext}
              variant="secondary"
            />
          </>
        )}
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: "center",
    paddingTop: diamomTheme.spacing.sm,
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 40,
    textAlign: "center",
  },
  timerCard: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
    paddingVertical: diamomTheme.spacing.xl,
  },
  timer: {
    color: diamomTheme.colors.text,
    fontSize: 64,
    fontWeight: "800",
    lineHeight: 72,
  },
  timerLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    fontWeight: "600",
  },
  instruction: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonGroup: {
    gap: diamomTheme.spacing.md,
  },
});
