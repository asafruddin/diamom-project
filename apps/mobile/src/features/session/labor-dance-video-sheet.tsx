import Ionicons from "@expo/vector-icons/Ionicons";
import { useEvent } from "expo";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import type { VideoPlayer } from "expo-video";
import { VideoView } from "expo-video";
import { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActionButton } from "@/components/dia-ui";
import { diamomTheme } from "@/theme";

type LaborDanceVideoSheetProps = {
  isDone?: boolean;
  isPreparing?: boolean;
  isRunning: boolean;
  onClose: () => void;
  onFinish?: () => void;
  onPause: () => void;
  onResume: () => void;
  player: VideoPlayer;
  videoErrorMessage: string | null;
  videoSource: string | null;
  visible: boolean;
};

export function LaborDanceVideoSheet({
  isDone = false,
  isPreparing = false,
  isRunning,
  onClose,
  onFinish,
  onPause,
  onResume,
  player,
  videoErrorMessage,
  videoSource,
  visible,
}: LaborDanceVideoSheetProps) {
  const insets = useSafeAreaInsets();
  const videoRef = useRef<VideoView>(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const statusChange = useEvent(player, "statusChange", {
    error: undefined,
    status: player.status,
  });
  const isVideoLoading =
    !videoErrorMessage &&
    (isPreparing || Boolean(videoSource)) &&
    (isPreparing || statusChange.status !== "readyToPlay");

  const stopVideoPlayback = useCallback(() => {
    if (player.playing) {
      player.pause();
    }

    player.currentTime = 0;
  }, [player]);

  useEffect(() => {
    if (!visible) {
      setIsVideoExpanded(false);
      stopVideoPlayback();
    }
  }, [stopVideoPlayback, visible]);

  useEffect(() => {
    const orientationLock = isVideoExpanded
      ? ScreenOrientation.OrientationLock.LANDSCAPE
      : ScreenOrientation.OrientationLock.PORTRAIT_UP;

    void ScreenOrientation.lockAsync(orientationLock).catch(() => undefined);

    return () => {
      if (isVideoExpanded) {
        void ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        ).catch(() => undefined);
      }
    };
  }, [isVideoExpanded]);

  useEffect(() => {
    if (!visible || !videoSource || videoErrorMessage) {
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
    isRunning,
    player,
    statusChange.status,
    videoErrorMessage,
    videoSource,
    visible,
  ]);

  const handleSeekBackward = () => {
    player.seekBy(-10);
  };

  const handleSeekForward = () => {
    player.seekBy(10);
  };

  const handleEnterFullscreen = () => {
    setIsVideoExpanded(true);
  };

  const handleExitFullscreen = () => {
    setIsVideoExpanded(false);
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={isVideoExpanded ? handleExitFullscreen : onClose}
      transparent
      visible={visible}
    >
      <StatusBar
        hidden={isVideoExpanded}
        style={isVideoExpanded ? "light" : "dark"}
      />
      <View
        style={[
          styles.sheetRoot,
          isVideoExpanded && styles.sheetRootFullscreen,
        ]}
      >
        {!isVideoExpanded ? (
          <Pressable
            accessibilityLabel="Tutup video panduan"
            accessibilityRole="button"
            onPress={onClose}
            style={styles.sheetBackdrop}
          />
        ) : null}
        <View style={[styles.sheet, isVideoExpanded && styles.sheetFullscreen]}>
          {!isVideoExpanded ? (
            <>
              <View style={styles.sheetHandle} />
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Video Tutorial</Text>
                <Pressable
                  accessibilityLabel="Tutup video panduan"
                  accessibilityRole="button"
                  onPress={onClose}
                  style={styles.sheetCloseButton}
                >
                  <Ionicons
                    color={diamomTheme.colors.primaryStrong}
                    name="close"
                    size={22}
                  />
                </Pressable>
              </View>
            </>
          ) : null}

          {videoErrorMessage ? (
            <View style={styles.videoFallbackFrame}>
              <Ionicons
                color={diamomTheme.colors.danger}
                name="alert-circle-outline"
                size={42}
              />
              <Text style={styles.videoErrorText}>{videoErrorMessage}</Text>
            </View>
          ) : visible ? (
            <View
              style={[
                styles.videoFrame,
                isVideoExpanded && styles.videoFrameFullscreen,
              ]}
            >
              <VideoView
                ref={videoRef}
                contentFit="contain"
                fullscreenOptions={{ enable: false }}
                nativeControls={false}
                player={player}
                style={styles.video}
              />
              {isVideoExpanded ? (
                <>
                  <Pressable
                    accessibilityLabel="Keluar layar penuh"
                    accessibilityRole="button"
                    onPress={handleExitFullscreen}
                    style={[
                      styles.fullscreenCloseButton,
                      {
                        right: insets.right + diamomTheme.spacing.md,
                        top: insets.top + diamomTheme.spacing.sm,
                      },
                    ]}
                  >
                    <Ionicons
                      color={diamomTheme.colors.onPrimary}
                      name="close"
                      size={22}
                    />
                  </Pressable>
                  <View
                    style={[
                      styles.fullscreenControlBar,
                      {
                        bottom: insets.bottom + diamomTheme.spacing.md,
                        left: insets.left + diamomTheme.spacing.lg,
                        right: insets.right + diamomTheme.spacing.lg,
                      },
                    ]}
                  >
                    <Pressable
                      accessibilityLabel="Mundur 10 detik"
                      accessibilityRole="button"
                      onPress={handleSeekBackward}
                      style={styles.fullscreenControlButton}
                    >
                      <Ionicons
                        color={diamomTheme.colors.onPrimary}
                        name="play-back"
                        size={24}
                      />
                      <Text style={styles.fullscreenControlLabel}>10d</Text>
                    </Pressable>

                    {isRunning ? (
                      <Pressable
                        accessibilityLabel="Jeda video"
                        accessibilityRole="button"
                        onPress={onPause}
                        style={styles.fullscreenPrimaryButton}
                      >
                        <Ionicons
                          color={diamomTheme.colors.text}
                          name="pause"
                          size={28}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        accessibilityLabel="Lanjutkan video"
                        accessibilityRole="button"
                        onPress={onResume}
                        style={styles.fullscreenPrimaryButton}
                      >
                        <Ionicons
                          color={diamomTheme.colors.text}
                          name="play"
                          size={28}
                        />
                      </Pressable>
                    )}

                    <Pressable
                      accessibilityLabel="Maju 10 detik"
                      accessibilityRole="button"
                      onPress={handleSeekForward}
                      style={styles.fullscreenControlButton}
                    >
                      <Ionicons
                        color={diamomTheme.colors.onPrimary}
                        name="play-forward"
                        size={24}
                      />
                      <Text style={styles.fullscreenControlLabel}>10d</Text>
                    </Pressable>
                  </View>
                </>
              ) : null}
              {isVideoLoading ? (
                <View style={styles.videoOverlay}>
                  <Text style={styles.videoOverlayText}>Menyiapkan video...</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {!isVideoExpanded ? (
            <View style={styles.sheetControlFrame}>
              <View style={styles.transportRow}>
                <Pressable
                  accessibilityLabel="Mundur 10 detik"
                  accessibilityRole="button"
                  onPress={handleSeekBackward}
                  style={styles.transportButton}
                >
                  <Ionicons
                    color={diamomTheme.colors.primaryStrong}
                    name="play-back"
                    size={22}
                  />
                  <Text style={styles.transportLabel}>10d</Text>
                </Pressable>

                {isRunning ? (
                  <Pressable
                    accessibilityLabel="Jeda video"
                    accessibilityRole="button"
                    onPress={onPause}
                    style={styles.transportButton}
                  >
                    <Ionicons
                      color={diamomTheme.colors.primaryStrong}
                      name="pause"
                      size={24}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    accessibilityLabel="Lanjutkan video"
                    accessibilityRole="button"
                    onPress={onResume}
                    style={styles.transportButton}
                  >
                    <Ionicons
                      color={diamomTheme.colors.primaryStrong}
                      name="play"
                      size={24}
                    />
                  </Pressable>
                )}

                <Pressable
                  accessibilityLabel="Maju 10 detik"
                  accessibilityRole="button"
                  onPress={handleSeekForward}
                  style={styles.transportButton}
                >
                  <Ionicons
                    color={diamomTheme.colors.primaryStrong}
                    name="play-forward"
                    size={22}
                  />
                  <Text style={styles.transportLabel}>10d</Text>
                </Pressable>

                <Pressable
                  accessibilityLabel="Layar penuh"
                  accessibilityRole="button"
                  onPress={handleEnterFullscreen}
                  style={styles.transportButton}
                >
                  <Ionicons
                    color={diamomTheme.colors.primaryStrong}
                    name="expand"
                    size={22}
                  />
                </Pressable>
              </View>

              {onFinish ? (
                <ActionButton label="Selesai" onPress={onFinish} />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheetRootFullscreen: {
    backgroundColor: "#000000",
    justifyContent: "center",
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
  sheetFullscreen: {
    backgroundColor: "#000000",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 1,
    gap: 0,
    justifyContent: "center",
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
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
  videoFrame: {
    aspectRatio: 16 / 9,
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.md,
    overflow: "hidden",
    position: "relative",
  },
  videoFrameFullscreen: {
    aspectRatio: undefined,
    backgroundColor: "#000000",
    borderRadius: 0,
    flex: 1,
    width: "100%",
  },
  fullscreenCloseButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    borderRadius: diamomTheme.radius.pill,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    width: 40,
    zIndex: 2,
  },
  fullscreenControlBar: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    borderRadius: diamomTheme.radius.pill,
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    justifyContent: "center",
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
    position: "absolute",
    zIndex: 2,
  },
  fullscreenControlButton: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.pill,
    height: 48,
    justifyContent: "center",
    minWidth: 54,
    paddingHorizontal: diamomTheme.spacing.sm,
  },
  fullscreenPrimaryButton: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.onPrimary,
    borderRadius: diamomTheme.radius.pill,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  fullscreenControlLabel: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 10,
    fontWeight: "800",
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
  videoErrorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  sheetControlFrame: {
    backgroundColor: diamomTheme.colors.background,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    gap: diamomTheme.spacing.md,
    padding: diamomTheme.spacing.md,
  },
  transportRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transportButton: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    height: 44,
    justifyContent: "center",
    minWidth: 44,
    paddingHorizontal: diamomTheme.spacing.sm,
  },
  transportLabel: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 10,
    fontWeight: "800",
  },
});
