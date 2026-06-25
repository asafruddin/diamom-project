import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, SurfaceCard } from "@/components/dia-ui";
import { LaborDanceVideoSheet } from "@/features/session/labor-dance-video-sheet";
import { LABOR_DANCE_VIDEO_SHARE_URL } from "@/features/session/labor-dance-video";
import { useLaborDanceVideoPlayer } from "@/features/session/use-labor-dance-video-player";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { VAS_ILLUSTRATIONS } from "@/features/session/vas-content";
import { formatTimer } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

const STOP_IF_ITEMS = [
  "Pusing",
  "Perdarahan",
  "Sesak napas",
] as const;

export default function PracticeSessionScreen() {
  const activityTitle = usePracticeSessionStore((state) => state.activityTitle);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const [hasStartedSession, setHasStartedSession] = useState(false);
  const [isVideoSheetVisible, setIsVideoSheetVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const { isPreparing, player, videoErrorMessage, videoSource } =
    useLaborDanceVideoPlayer(LABOR_DANCE_VIDEO_SHARE_URL);
  const isDone = secondsLeft === 0;

  const pausePlayback = useCallback(() => {
    if (player.playing) {
      player.pause();
    }
  }, [player]);

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

  const handleStart = () => {
    setHasStartedSession(true);
    setIsRunning(true);
    setIsVideoSheetVisible(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    pausePlayback();
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleOpenVideoSheet = () => {
    setIsVideoSheetVisible(true);
    if (hasStartedSession && !isDone) {
      setIsRunning(true);
    }
  };

  const handleCloseVideoSheet = () => {
    setIsVideoSheetVisible(false);
    pausePlayback();
  };

  const handleNext = () => {
    pausePlayback();
    setHasStartedSession(false);
    setIsVideoSheetVisible(false);
    setIsRunning(false);
    router.push("/(tabs)/vas/after");
  };

  return (
    <DiaScreen contentContainerStyle={styles.screenContent}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          Pelaksanaan{"\n"}
          {activityTitle}
        </Text>
      </View>

      <View style={styles.heroStage}>
        <View style={styles.artworkRow}>
          <View style={styles.stopwatchWrap}>
            <Ionicons
              color={diamomTheme.colors.primaryStrong}
              name="stopwatch-outline"
              size={118}
            />
          </View>
          <Image
            accessibilityLabel="Ilustrasi pelaksanaan Labor Dance"
            contentFit="contain"
            source={VAS_ILLUSTRATIONS.laborDanceSession}
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.timer}>{formatTimer(secondsLeft)}</Text>
        <Text style={styles.timerLabel}>Durasi Kegiatan</Text>
      </View>

      <Text style={styles.instruction}>
        Ikuti gerakan dengan nyaman dan fokus pada napas.
      </Text>

      <SurfaceCard style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>Hentikan jika:</Text>
        {STOP_IF_ITEMS.map((item, index) => (
          <Text key={item} style={styles.safetyItem}>
            {String.fromCharCode(97 + index)}. {item}
          </Text>
        ))}
      </SurfaceCard>

      <View style={styles.buttonGroup}>
        {!hasStartedSession ? (
          <ActionButton label="Mulai" onPress={handleStart} />
        ) : (
          <>
            <ActionButton
              disabled={isRunning}
              label="Mulai"
              onPress={handleResume}
            />
            <ActionButton
              disabled={!isRunning}
              label="Jeda"
              onPress={handlePause}
              variant="secondary"
            />
            <ActionButton
              label="Lihat Video Tutorial"
              onPress={handleOpenVideoSheet}
              variant="secondary"
            />
          </>
        )}
      </View>

      {videoErrorMessage ? (
        <Text style={styles.videoErrorText}>{videoErrorMessage}</Text>
      ) : null}

      <LaborDanceVideoSheet
        isDone={isDone}
        isPreparing={isPreparing}
        isRunning={isRunning}
        onClose={handleCloseVideoSheet}
        onFinish={handleNext}
        onPause={handlePause}
        onResume={handleResume}
        player={player}
        videoErrorMessage={videoErrorMessage}
        videoSource={videoSource}
        visible={isVideoSheetVisible}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    gap: diamomTheme.spacing.md,
    paddingBottom: diamomTheme.spacing.xxl,
  },
  headerSection: {
    alignItems: "flex-start",
    paddingHorizontal: diamomTheme.spacing.xl,
    paddingTop: diamomTheme.spacing.sm,
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 29,
    fontWeight: "800",
    lineHeight: 36,
    textAlign: "left",
  },
  heroStage: {
    alignItems: "center",
    gap: diamomTheme.spacing.xs,
  },
  artworkRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 280,
    width: "100%",
  },
  stopwatchWrap: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    borderWidth: 6,
    height: 156,
    justifyContent: "center",
    marginRight: -diamomTheme.spacing.lg,
    width: 156,
    zIndex: 1,
  },
  heroImage: {
    height: 320,
    width: 220,
  },
  timer: {
    color: diamomTheme.colors.text,
    fontSize: 58,
    fontWeight: "800",
    lineHeight: 64,
  },
  timerLabel: {
    color: diamomTheme.colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  instruction: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 23,
    paddingHorizontal: diamomTheme.spacing.xl,
    textAlign: "center",
  },
  safetyCard: {
    gap: diamomTheme.spacing.xs,
    marginHorizontal: diamomTheme.spacing.md,
  },
  safetyTitle: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  safetyItem: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonGroup: {
    gap: diamomTheme.spacing.md,
    paddingTop: diamomTheme.spacing.md,
  },
  videoErrorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
