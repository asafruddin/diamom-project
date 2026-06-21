const GOOGLE_DRIVE_FILE_ID_PATTERN = /\/file\/d\/([^/]+)\//;

export const LABOR_DANCE_VIDEO_SHARE_URL =
  "https://drive.google.com/file/d/1ZPNKh-rSqbLIiLLxmH_1qLeMnfo7hUYE/view?usp=drive_link";

export function getPlayableGoogleDriveVideoUrl(
  shareUrl: string | null | undefined,
): string | null {
  if (!shareUrl) {
    return null;
  }

  const fileIdFromPath = shareUrl.match(GOOGLE_DRIVE_FILE_ID_PATTERN)?.[1];

  if (fileIdFromPath) {
    return `https://drive.usercontent.google.com/download?id=${fileIdFromPath}&export=download&confirm=t`;
  }

  try {
    const parsedUrl = new URL(shareUrl);
    const fileIdFromQuery = parsedUrl.searchParams.get("id");

    if (!fileIdFromQuery) {
      return null;
    }

    return `https://drive.usercontent.google.com/download?id=${fileIdFromQuery}&export=download&confirm=t`;
  } catch {
    return null;
  }
}
