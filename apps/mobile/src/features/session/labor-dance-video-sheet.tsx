import Ionicons from "@expo/vector-icons/Ionicons";
import { useEvent } from "expo";
import type { VideoPlayer } from "expo-video";
import { VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ActionButton } from "@/components/dia-ui";
import { formatTimer } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

type LaborDanceVideoSheetProps = {
  isDone?: boolean;
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
  const videoRef = useRef<VideoView>(null);
  const [trackWidth, setTrackWidth] = useState(1);
  const timeUpdate = useEvent(player, "timeUpdate", {
    bufferedPosition: player.bufferedPosition,
    currentLiveTimestamp: player.currentLiveTimestamp,
    currentOffsetFromLive: player.currentOffsetFromLive,
    currentTime: player.currentTime,
  });
  const statusChange = useEvent(player, "statusChange", {
    error: undefined,
    status: player.status,
  });
  const duration = player.duration || 0;
  const currentTime = timeUpdate.currentTime ?? player.currentTime ?? 0;
  const isVideoLoading =
    Boolean(videoSource) &&
    !videoErrorMessage &&
    statusChange.status !== "readyToPlay";

  const seekToRatio = (ratio: number) => {
    if (duration <= 0) {
      return;
    }

    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const targetTime = clampedRatio * duration;
    player.seekBy(targetTime - currentTime);
  };

  const seekResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        seekToRatio(event.nativeEvent.locationX / trackWidth);
      },
      onPanResponderMove: (event) => {
        seekToRatio(event.nativeEvent.locationX / trackWidth);
      },
      onStartShouldSetPanResponder: () => true,
    }),
  ).current;

  useEffect(() => {
    if (!visible || !videoSource || videoErrorMessage) {
      if (player.playing) {
        player.pause();
      }
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

  const handleFullscreen = () => {
    videoRef.current?.enterFullscreen();
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.sheetRoot}>
        <Pressable
          accessibilityLabel="Tutup video panduan"
          accessibilityRole="button"
          onPress={onClose}
          style={styles.sheetBackdrop}
        />
        <View style={styles.sheet}>
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
                ref={videoRef}
                contentFit="contain"
                fullscreenOptions={{ enable: true }}
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
            <View style={styles.seekRow}>
              <Text style={styles.seekTime}>{formatTimer(currentTime)}</Text>
              <View
                onLayout={(event) => {
                  setTrackWidth(event.nativeEvent.layout.width);
                }}
                style={styles.seekTrack}
                {...seekResponder.panHandlers}
              >
                <View
                  style={[
                    styles.seekFill,
                    {
                      width:
                        duration > 0
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.seekThumb,
                    {
                      left:
                        duration > 0
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                    },
                  ]}
                />
              </View>
              <Text style={styles.seekTime}>
                {formatTimer(duration || 0)}
              </Text>
            </View>

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
                onPress={handleFullscreen}
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
  seekRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  seekTime: {
    color: diamomTheme.colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
    minWidth: 44,
    textAlign: "center",
  },
  seekTrack: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    flex: 1,
    height: 8,
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
  },
  seekFill: {
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.pill,
    height: 8,
  },
  seekThumb: {
    backgroundColor: diamomTheme.colors.primaryStrong,
    borderRadius: diamomTheme.radius.pill,
    height: 16,
    marginLeft: -8,
    position: "absolute",
    top: -4,
    width: 16,
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
