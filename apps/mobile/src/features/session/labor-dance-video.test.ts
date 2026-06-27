import assert from "node:assert";
import test from "node:test";

import {
  LABOR_DANCE_VIDEO_URL,
  getPlayableLaborDanceVideoUrl,
} from "./labor-dance-video";

test("getPlayableLaborDanceVideoUrl transforms Cloudinary embed URLs", async (t) => {
  await t.test("transforms the configured Labor Dance embed URL", () => {
    assert.strictEqual(
      getPlayableLaborDanceVideoUrl(LABOR_DANCE_VIDEO_URL),
      "https://res.cloudinary.com/dmrefeofw/video/upload/Video_-_Labor_Dance_1_t5pmbh.mp4",
    );
  });

  await t.test("accepts a direct Cloudinary delivery URL", () => {
    const directUrl =
      "https://res.cloudinary.com/dmrefeofw/video/upload/Video_-_Labor_Dance_1_t5pmbh.mp4";

    assert.strictEqual(getPlayableLaborDanceVideoUrl(directUrl), directUrl);
  });

  await t.test("returns null for malformed or unsupported URLs", () => {
    assert.strictEqual(
      getPlayableLaborDanceVideoUrl(
        "https://player.cloudinary.com/embed/?cloud_name=dmrefeofw",
      ),
      null,
    );
    assert.strictEqual(
      getPlayableLaborDanceVideoUrl("https://example.com/video.mp4"),
      null,
    );
    assert.strictEqual(getPlayableLaborDanceVideoUrl(undefined), null);
  });
});
