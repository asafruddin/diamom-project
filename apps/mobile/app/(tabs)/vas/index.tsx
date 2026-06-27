import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, VasSelector } from "@/components/dia-ui";
import { LaborDanceVideoSheet } from "@/features/session/labor-dance-video-sheet";
import { LABOR_DANCE_VIDEO_URL } from "@/features/session/labor-dance-video";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { useLaborDanceVideoPlayer } from "@/features/session/use-labor-dance-video-player";
import {
  VasLegendIllustrationPanel,
  VasScoreDisplay,
} from "@/features/session/vas-components";
import { VAS_ILLUSTRATIONS } from "@/features/session/vas-content";
import { diamomTheme } from "@/theme";

export default function VasBeforeScreen() {
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const setBeforeScore = usePracticeSessionStore(
    (state) => state.setBeforeScore,
  );
  const [selectedScore, setSelectedScore] = useState(beforeScore ?? 0);
  const [isVideoSheetVisible, setIsVideoSheetVisible] = useState(false);
  const [isVideoRunning, setIsVideoRunning] = useState(false);
  const { isPreparing, player, videoErrorMessage, videoSource } =
    useLaborDanceVideoPlayer(LABOR_DANCE_VIDEO_URL);

  const handleOpenVideo = () => {
    setIsVideoSheetVisible(true);
    setIsVideoRunning(true);
  };

  const handleCloseVideo = () => {
    setIsVideoSheetVisible(false);
    setIsVideoRunning(false);
    if (player.playing) {
      player.pause();
    }
  };

  return (
    <DiaScreen>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Penilaian Nyeri (VAS)</Text>
        <Text style={styles.subtitle}>Sebelum Kegiatan</Text>
        <Text style={styles.description}>
          Geser slider sesuai nyeri yang Anda rasakan sekarang.
        </Text>
      </View>

      <VasSelector
        onChange={setSelectedScore}
        showSummary={false}
        value={selectedScore}
      />

      <VasScoreDisplay score={selectedScore} />

      <VasLegendIllustrationPanel
        accessibilityLabel="Ilustrasi penilaian nyeri sebelum kegiatan"
        source={VAS_ILLUSTRATIONS.before}
      />

      <View style={styles.buttonGroup}>
        <ActionButton
          accessibilityLabel="Mulai kegiatan Labor Dance"
          label="Mulai Kegiatan"
          onPress={() => {
            setBeforeScore(selectedScore);
            router.push("/(tabs)/vas/session");
          }}
        />
        <ActionButton
          accessibilityLabel="Lihat video tutorial Labor Dance"
          label="Lihat Video Tutorial"
          onPress={handleOpenVideo}
          variant="secondary"
        />
      </View>

      <LaborDanceVideoSheet
        isPreparing={isPreparing}
        isRunning={isVideoRunning}
        onClose={handleCloseVideo}
        onPause={() => setIsVideoRunning(false)}
        onResume={() => setIsVideoRunning(true)}
        player={player}
        videoErrorMessage={videoErrorMessage}
        videoSource={videoSource}
        visible={isVideoSheetVisible}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: "center",
    gap: diamomTheme.spacing.xs,
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    textAlign: "center",
  },
  subtitle: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonGroup: {
    gap: diamomTheme.spacing.md,
  },
});
