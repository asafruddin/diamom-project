import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen } from "@/components/dia-ui";
import {
  LABOR_DANCE_VIDEO_SHARE_URL,
  getPlayableGoogleDriveVideoUrl,
} from "@/features/session/labor-dance-video";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { VAS_ILLUSTRATIONS } from "@/features/session/vas-content";
import { formatTimer } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function PracticeSessionScreen() {
  const activityTitle = usePracticeSessionStore((state) => state.activityTitle);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const [isVideoSheetVisible, setIsVideoSheetVisible] = useState(false);
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

  useEffect(() => {
    if (!hasStartedPlayback) {
      return;
    }

    if (!isVideoSheetVisible || !videoSource || videoErrorMessage) {
      pausePlayback();
      return;
    }

    if (isRunning && statusChange.status === "readyToPlay" && !player.playing) {
      player.play();
      return;
    }

    if (!isRunning) {
      pausePlayback();
    }
  }, [
    hasStartedPlayback,
    isRunning,
    isVideoSheetVisible,
    player,
    pausePlayback,
    statusChange.status,
    videoErrorMessage,
    videoSource,
  ]);

  const handleStart = () => {
    setHasStartedPlayback(true);
    setIsRunning(true);
    setIsVideoSheetVisible(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleOpenVideoSheet = () => {
    setIsVideoSheetVisible(true);
  };

  const handleCloseVideoSheet = () => {
    setIsVideoSheetVisible(false);
    pausePlayback();
  };

  const handleNext = () => {
    pausePlayback();
    setHasStartedPlayback(false);
    setIsVideoSheetVisible(false);
    handlePause();
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

      <View style={styles.buttonGroup}>
        {!hasStartedPlayback ? (
          <ActionButton label="Mulai" onPress={handleStart} />
        ) : isDone ? (
          <ActionButton label="Buka Kontrol" onPress={handleOpenVideoSheet} />
        ) : isRunning ? (
          <ActionButton label="Lihat Video" onPress={handleOpenVideoSheet} />
        ) : (
          <ActionButton label="Lanjutkan" onPress={handleStart} />
        )}
      </View>

      {videoErrorMessage ? (
        <Text style={styles.videoErrorText}>{videoErrorMessage}</Text>
      ) : null}

      <Modal
        animationType="slide"
        onRequestClose={handleCloseVideoSheet}
        transparent
        visible={isVideoSheetVisible}
      >
        <View style={styles.sheetRoot}>
          <Pressable
            accessibilityLabel="Tutup video panduan"
            accessibilityRole="button"
            onPress={handleCloseVideoSheet}
            style={styles.sheetBackdrop}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Video Panduan</Text>
              <Pressable
                accessibilityLabel="Tutup video panduan"
                accessibilityRole="button"
                onPress={handleCloseVideoSheet}
                style={styles.sheetCloseButton}
              >
                <Ionicons
                  color={diamomTheme.colors.primaryStrong}
                  name="close"
                  size={22}
                />
              </Pressable>
            </View>
            {videoErrorMessage ? (
              <View style={styles.videoFallbackFrame}>
                <Ionicons
                  color={diamomTheme.colors.danger}
                  name="alert-circle-outline"
                  size={42}
                />
                <Text style={styles.videoErrorText}>{videoErrorMessage}</Text>
              </View>
            ) : (
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
                    <Text style={styles.videoOverlayText}>
                      Menyiapkan video...
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
            <View style={styles.sheetControlFrame}>
              <Text style={styles.videoHelperText}>
                Ikuti video seperlunya. Anda dapat menutup panduan dan tetap
                memakai timer utama.
              </Text>
              <View style={styles.sheetButtonGroup}>
                {isDone ? null : isRunning ? (
                  <ActionButton
                    label="Jeda"
                    onPress={handlePause}
                    variant="secondary"
                  />
                ) : (
                  <ActionButton label="Lanjutkan" onPress={handleStart} />
                )}
                <ActionButton label="Selesai" onPress={handleNext} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    minHeight: 250,
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
    height: 270,
    width: 188,
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
  videoFallbackFrame: {
    alignItems: "center",
    aspectRatio: 16 / 9,
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    gap: diamomTheme.spacing.sm,
    justifyContent: "center",
    padding: diamomTheme.spacing.lg,
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
  buttonGroup: {
    gap: diamomTheme.spacing.md,
    paddingTop: diamomTheme.spacing.md,
  },
  sheetRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(92, 60, 89, 0.28)",
  },
  sheet: {
    backgroundColor: diamomTheme.colors.surface,
    borderTopLeftRadius: diamomTheme.radius.lg,
    borderTopRightRadius: diamomTheme.radius.lg,
    gap: diamomTheme.spacing.md,
    paddingBottom: diamomTheme.spacing.xl,
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingTop: diamomTheme.spacing.sm,
  },
  sheetControlFrame: {
    backgroundColor: diamomTheme.colors.background,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.md,
  },
  sheetButtonGroup: {
    gap: diamomTheme.spacing.sm,
  },
  sheetHandle: {
    alignSelf: "center",
    backgroundColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.pill,
    height: 4,
    width: 42,
  },
  sheetHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sheetTitle: {
    color: diamomTheme.colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  sheetCloseButton: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
});
