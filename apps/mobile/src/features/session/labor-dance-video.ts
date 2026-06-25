const GOOGLE_DRIVE_FILE_ID_PATTERN = /\/file\/d\/([^/]+)\//;

export const LABOR_DANCE_VIDEO_SHARE_URL =
  "https://drive.google.com/file/d/1ZPNKh-rSqbLIiLLxmH_1qLeMnfo7hUYE/view?usp=drive_link";

export function getGoogleDriveFileId(
  shareUrl: string | null | undefined,
): string | null {
  if (!shareUrl) {
    return null;
  }

  const fileIdFromPath = shareUrl.match(GOOGLE_DRIVE_FILE_ID_PATTERN)?.[1];

  if (fileIdFromPath) {
    return fileIdFromPath;
  }

  try {
    const parsedUrl = new URL(shareUrl);
    return parsedUrl.searchParams.get("id");
  } catch {
    return null;
  }
}

export function getLaborDanceVideoCacheFileName(fileId: string): string {
  return `labor-dance-${fileId}.mp4`;
}

export function getPlayableGoogleDriveVideoUrl(
  shareUrl: string | null | undefined,
): string | null {
  const fileId = getGoogleDriveFileId(shareUrl);

  if (!fileId) {
    return null;
  }

  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
}
