import assert from "node:assert";
import test from "node:test";

import {
  LABOR_DANCE_VIDEO_SHARE_URL,
  getPlayableGoogleDriveVideoUrl,
} from "./labor-dance-video";

test("getPlayableGoogleDriveVideoUrl returns a direct playback URL", async (t) => {
  await t.test("transforms a Google Drive share URL with a file path id", () => {
    assert.strictEqual(
      getPlayableGoogleDriveVideoUrl(LABOR_DANCE_VIDEO_SHARE_URL),
      "https://drive.usercontent.google.com/download?id=1ZPNKh-rSqbLIiLLxmH_1qLeMnfo7hUYE&export=download&confirm=t",
    );
  });

  await t.test("transforms a Google Drive URL with an id query param", () => {
    assert.strictEqual(
      getPlayableGoogleDriveVideoUrl(
        "https://drive.google.com/open?id=example-file-id",
      ),
      "https://drive.usercontent.google.com/download?id=example-file-id&export=download&confirm=t",
    );
  });

  await t.test("returns null for malformed or missing file ids", () => {
    assert.strictEqual(
      getPlayableGoogleDriveVideoUrl("https://drive.google.com/file/d//view"),
      null,
    );
    assert.strictEqual(
      getPlayableGoogleDriveVideoUrl("https://example.com/video.mp4"),
      null,
    );
    assert.strictEqual(getPlayableGoogleDriveVideoUrl(undefined), null);
  });
});
