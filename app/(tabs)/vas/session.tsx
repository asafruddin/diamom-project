import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
    ActionButton,
    DiaScreen,
    IllustrationPanel,
    InfoPill,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
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
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (beforeScore === null) {
      router.replace("/(tabs)/vas");
    }
  }, [beforeScore]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Pelaksanaan"
        showBack
        title={`Pelaksanaan ${activityTitle}`}
        description="Ikuti gerakan dengan nyaman dan fokus pada napas panjang yang stabil."
      />

      <IllustrationPanel
        badge={formatTimer(secondsLeft).slice(0, 2)}
        title={formatTimer(secondsLeft)}
        detail="Durasi kegiatan dapat dijalankan, dijeda, lalu dilanjutkan sesuai kebutuhan tubuh Anda."
      />

      <SurfaceCard style={styles.timerCard}>
        <InfoPill label={`VAS sebelum: ${beforeScore ?? "-"}`} />
        <Text style={styles.timer}>{formatTimer(secondsLeft)}</Text>
        <Text style={styles.helperText}>
          Bila tubuh terasa tidak aman atau tidak nyaman, hentikan sesi dan
          kembali ke materi edukasi.
        </Text>
      </SurfaceCard>

      <View style={styles.buttonGroup}>
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
          onPress={() => {
            setIsRunning(false);
            router.push("/(tabs)/vas/after");
          }}
          variant="secondary"
        />
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  timerCard: {
    alignItems: "center",
    gap: diamomTheme.spacing.md,
  },
  timer: {
    color: diamomTheme.colors.text,
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 56,
  },
  helperText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  buttonGroup: {
    gap: diamomTheme.spacing.md,
  },
});
