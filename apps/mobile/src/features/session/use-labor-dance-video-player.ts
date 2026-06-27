import { useEvent } from "expo";
import { useVideoPlayer } from "expo-video";
import { useEffect } from "react";

import { getPlayableLaborDanceVideoUrl } from "./labor-dance-video";

const INVALID_VIDEO_URL_MESSAGE = "Tautan video Labor Dance tidak valid.";
const VIDEO_STREAM_ERROR_MESSAGE =
  "Video Labor Dance belum dapat diputar saat ini.";

export function useLaborDanceVideoPlayer(videoUrl: string) {
  const playableVideoUrl = getPlayableLaborDanceVideoUrl(videoUrl);
  const player = useVideoPlayer(playableVideoUrl, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = false;
    videoPlayer.showNowPlayingNotification = false;
    videoPlayer.staysActiveInBackground = false;
  });

  useEffect(() => {
    if (!playableVideoUrl) {
      return;
    }

    void player.replaceAsync(playableVideoUrl).catch(() => undefined);
  }, [player, playableVideoUrl]);

  const statusChange = useEvent(player, "statusChange", {
    error: undefined,
    status: player.status,
  });

  const videoErrorMessage = !playableVideoUrl
    ? INVALID_VIDEO_URL_MESSAGE
    : statusChange.status === "error"
      ? (statusChange.error?.message ?? VIDEO_STREAM_ERROR_MESSAGE)
      : null;

  const isPreparing =
    Boolean(playableVideoUrl) &&
    !videoErrorMessage &&
    statusChange.status !== "readyToPlay";

  return {
    isPreparing,
    player,
    videoErrorMessage,
    videoSource: playableVideoUrl,
  };
}
