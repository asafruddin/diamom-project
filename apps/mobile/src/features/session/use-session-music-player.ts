import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useCallback, useEffect } from "react";

import { LABOR_DANCE_SESSION_MUSIC_URL } from "./session-music";

export function useSessionMusicPlayer(shouldPlay: boolean) {
  const player = useAudioPlayer(LABOR_DANCE_SESSION_MUSIC_URL);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    void setAudioModeAsync({
      interruptionMode: "mixWithOthers",
      playsInSilentMode: true,
    }).catch(() => undefined);

    player.loop = true;
  }, [player]);

  const startMusic = useCallback(() => {
    player.loop = true;
    player.play();
  }, [player]);

  const stopMusic = useCallback(() => {
    player.pause();
    void player.seekTo(0);
  }, [player]);

  useEffect(() => {
    if (!shouldPlay) {
      if (player.playing) {
        player.pause();
      }
      return;
    }

    startMusic();
  }, [player, shouldPlay, startMusic, status.isLoaded]);

  return { startMusic, stopMusic };
}
