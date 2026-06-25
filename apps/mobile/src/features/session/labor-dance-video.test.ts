import assert from "node:assert";
import test from "node:test";

import {
  LABOR_DANCE_VIDEO_SHARE_URL,
  getGoogleDriveFileId,
  getLaborDanceVideoCacheFileName,
  getPlayableGoogleDriveVideoUrl,
} from "./labor-dance-video";

test(
  "getGoogleDriveFileId extracts a file id from Google Drive share URLs",
  async (t) => {
    await t.test("reads a file id from a /file/d/ share URL", () => {
      assert.strictEqual(
        getGoogleDriveFileId(LABOR_DANCE_VIDEO_SHARE_URL),
        "1ZPNKh-rSqbLIiLLxmH_1qLeMnfo7hUYE",
      );
    });

    await t.test("reads a file id from an open?id query URL", () => {
      assert.strictEqual(
        getGoogleDriveFileId("https://drive.google.com/open?id=example-file-id"),
        "example-file-id",
      );
    });

    await t.test("returns null for malformed or missing file ids", () => {
      assert.strictEqual(
        getGoogleDriveFileId("https://drive.google.com/file/d//view"),
        null,
      );
      assert.strictEqual(
        getGoogleDriveFileId("https://example.com/video.mp4"),
        null,
      );
      assert.strictEqual(getGoogleDriveFileId(undefined), null);
    });
  },
);

test("getLaborDanceVideoCacheFileName uses a stable cache filename", () => {
  assert.strictEqual(
    getLaborDanceVideoCacheFileName("example-file-id"),
    "labor-dance-example-file-id.mp4",
  );
});

test("getPlayableGoogleDriveVideoUrl returns a direct playback URL", async (t) => {
  await t.test(
    "transforms a Google Drive share URL with a file path id",
    () => {
      assert.strictEqual(
        getPlayableGoogleDriveVideoUrl(LABOR_DANCE_VIDEO_SHARE_URL),
        "https://drive.usercontent.google.com/download?id=1ZPNKh-rSqbLIiLLxmH_1qLeMnfo7hUYE&export=download&confirm=t",
      );
    },
  );

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
