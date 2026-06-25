import { useEvent } from "expo";
import { File, Paths } from "expo-file-system";
import { useVideoPlayer } from "expo-video";
import { useEffect, useMemo, useState } from "react";

import {
  getGoogleDriveFileId,
  getLaborDanceVideoCacheFileName,
  getPlayableGoogleDriveVideoUrl,
} from "./labor-dance-video";

const INVALID_VIDEO_URL_MESSAGE = "Tautan video Labor Dance tidak valid.";
const VIDEO_STREAM_ERROR_MESSAGE =
  "Video Labor Dance belum dapat diputar saat ini.";
const INVALID_VIDEO_DOWNLOAD_MESSAGE =
  "Video Labor Dance belum dapat disiapkan saat ini.";
const MIN_PLAYABLE_VIDEO_BYTES = 1_000_000;

export function useLaborDanceVideoPlayer(shareUrl: string) {
  const remoteVideoUrl = getPlayableGoogleDriveVideoUrl(shareUrl);
  const fileId = getGoogleDriveFileId(shareUrl);
  const cachedVideoFile = useMemo(() => {
    if (!fileId) {
      return null;
    }

    return new File(Paths.cache, getLaborDanceVideoCacheFileName(fileId));
  }, [fileId]);
  const [cachedVideoUri, setCachedVideoUri] = useState<string | null>(
    cachedVideoFile?.exists && cachedVideoFile.size > MIN_PLAYABLE_VIDEO_BYTES
      ? cachedVideoFile.uri
      : null,
  );
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<
    string | null
  >(null);
  const [isDownloading, setIsDownloading] = useState(
    Boolean(remoteVideoUrl && cachedVideoFile && !cachedVideoFile.exists),
  );
  const videoSource = cachedVideoUri;
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

  useEffect(() => {
    let isCancelled = false;

    async function prepareVideo() {
      if (!remoteVideoUrl || !cachedVideoFile) {
        setCachedVideoUri(null);
        setIsDownloading(false);
        setDownloadErrorMessage(null);
        return;
      }

      if (cachedVideoFile.exists && cachedVideoFile.size > MIN_PLAYABLE_VIDEO_BYTES) {
        setCachedVideoUri(cachedVideoFile.uri);
        setIsDownloading(false);
        setDownloadErrorMessage(null);
        return;
      }

      setIsDownloading(true);
      setDownloadErrorMessage(null);
      setCachedVideoUri(null);

      try {
        const downloadedFile = await File.downloadFileAsync(
          remoteVideoUrl,
          cachedVideoFile,
          { idempotent: true },
        );

        if (downloadedFile.size <= MIN_PLAYABLE_VIDEO_BYTES) {
          downloadedFile.delete();
          throw new Error("Google Drive returned a non-video response.");
        }

        if (!isCancelled) {
          setCachedVideoUri(downloadedFile.uri);
        }
      } catch {
        if (!isCancelled) {
          setCachedVideoUri(null);
          setDownloadErrorMessage(INVALID_VIDEO_DOWNLOAD_MESSAGE);
        }
      } finally {
        if (!isCancelled) {
          setIsDownloading(false);
        }
      }
    }

    void prepareVideo();

    return () => {
      isCancelled = true;
    };
  }, [cachedVideoFile, remoteVideoUrl]);

  const videoErrorMessage = !remoteVideoUrl
    ? INVALID_VIDEO_URL_MESSAGE
    : downloadErrorMessage
      ? downloadErrorMessage
    : statusChange.status === "error"
      ? (statusChange.error?.message ?? VIDEO_STREAM_ERROR_MESSAGE)
      : null;

  const isPreparing =
    Boolean(remoteVideoUrl) &&
    !videoErrorMessage &&
    (isDownloading || !videoSource || statusChange.status !== "readyToPlay");

  return {
    isPreparing,
    player,
    videoErrorMessage,
    videoSource,
  };
}
