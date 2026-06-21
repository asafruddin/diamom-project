import { router } from "expo-router";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, SurfaceCard } from "@/components/dia-ui";
import {
  LABOR_DANCE_VIDEO_SHARE_URL,
  getPlayableGoogleDriveVideoUrl,
} from "@/features/session/labor-dance-video";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { formatTimer } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function PracticeSessionScreen() {
  const activityTitle = usePracticeSessionStore((state) => state.activityTitle);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const videoSource = getPlayableGoogleDriveVideoUrl(LABOR_DANCE_VIDEO_SHARE_URL);
  const player = useVideoPlayer(videoSource, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = false;
    videoPlayer.showNowPlayingNotification = false;
    videoPlayer.staysActiveInBackground = false;
  });
  const statusChange = useEvent(player, "statusChange", {
    error: undefined,
    status: player.status,
  });
  const isDone = secondsLeft === 0;
  const videoErrorMessage =
    !videoSource
      ? "Tautan video Labor Dance tidak valid."
      : statusChange.status === "error"
        ? statusChange.error?.message ??
          "Video Labor Dance belum dapat diputar saat ini."
        : null;
  const isVideoLoading =
    hasStartedPlayback &&
    !videoErrorMessage &&
    statusChange.status !== "readyToPlay";

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

  useEffect(() => {
    if (!hasStartedPlayback || !videoSource || videoErrorMessage) {
      return;
    }

    if (isRunning && statusChange.status === "readyToPlay" && !player.playing) {
      player.play();
      return;
    }

    if (!isRunning && player.playing) {
      player.pause();
    }
  }, [
    hasStartedPlayback,
    isRunning,
    player,
    statusChange.status,
    videoErrorMessage,
    videoSource,
  ]);

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  const handleStart = () => {
    setHasStartedPlayback(true);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleNext = () => {
    player.pause();
    setHasStartedPlayback(false);
    handlePause();
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

      <SurfaceCard style={styles.videoCard}>
        {hasStartedPlayback ? (
          <>
            <View style={styles.videoFrame}>
              <VideoView
                contentFit="contain"
                fullscreenOptions={{ enable: false }}
                nativeControls={false}
                player={player}
                style={styles.video}
              />
              {isVideoLoading ? (
                <View style={styles.videoOverlay}>
                  <Text style={styles.videoOverlayText}>Menyiapkan video...</Text>
                </View>
              ) : null}
            </View>
            {videoErrorMessage ? (
              <Text style={styles.videoErrorText}>
                Video belum dapat diputar. Anda tetap dapat melanjutkan sesi dengan
                panduan timer ini.
              </Text>
            ) : (
              <Text style={styles.videoHelperText}>
                Ikuti gerakan pada video dengan nyaman sambil menjaga ritme napas.
              </Text>
            )}
          </>
        ) : (
          <>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderTitle}>Video Labor Dance</Text>
              <Text style={styles.videoPlaceholderText}>
                Video akan diputar di sini saat Anda menekan Mulai.
              </Text>
            </View>
            {videoErrorMessage ? (
              <Text style={styles.videoErrorText}>{videoErrorMessage}</Text>
            ) : null}
          </>
        )}
      </SurfaceCard>

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
            {!hasStartedPlayback ? (
              <ActionButton label="Mulai" onPress={handleStart} />
            ) : isRunning ? (
              <ActionButton label="Jeda" onPress={handlePause} />
            ) : (
              <ActionButton label="Lanjutkan" onPress={handleStart} />
            )}
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
  videoCard: {
    gap: diamomTheme.spacing.md,
  },
  videoFrame: {
    aspectRatio: 16 / 9,
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.md,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    flex: 1,
  },
  videoOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(92, 60, 89, 0.3)",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  videoOverlayText: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  videoPlaceholder: {
    alignItems: "center",
    aspectRatio: 16 / 9,
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderStyle: "dashed",
    borderWidth: 1,
    gap: diamomTheme.spacing.sm,
    justifyContent: "center",
    paddingHorizontal: diamomTheme.spacing.lg,
  },
  videoPlaceholderTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  videoPlaceholderText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  videoHelperText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  videoErrorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
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
