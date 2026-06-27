export const LABOR_DANCE_VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=dmrefeofw&public_id=Video_-_Labor_Dance_1_t5pmbh";

export function getPlayableLaborDanceVideoUrl(
  videoUrl: string | null | undefined,
): string | null {
  if (!videoUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(videoUrl);

    if (
      parsedUrl.hostname === "player.cloudinary.com" &&
      parsedUrl.pathname === "/embed/"
    ) {
      const cloudName = parsedUrl.searchParams.get("cloud_name");
      const publicId = parsedUrl.searchParams.get("public_id");

      if (!cloudName || !publicId) {
        return null;
      }

      return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
    }

    if (parsedUrl.hostname === "res.cloudinary.com") {
      return videoUrl;
    }
  } catch {
    return null;
  }

  return null;
}
