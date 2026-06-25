# Investigation: Google Drive Video Streaming Failure

## Hand-off Brief

1. **What happened.** Confirmed: the Labor Dance player was given a `drive.usercontent.google.com/download` URL, and the user-provided iOS log shows AVFoundation received a 2009-byte response while expecting a 297990577-byte media range.
2. **Where the case stands.** Concluded: Google Drive direct-download URLs are not reliable remote streaming sources for `expo-video`; the current refactor also had missing helper exports.
3. **What's needed next.** Verify on a device after the cache/download path prepares a local MP4, or move the asset to a Range-capable video host/CDN for true streaming.

## Case Info

| Field | Value |
| --- | --- |
| Ticket | N/A |
| Date opened | 2026-06-25 |
| Status | Concluded |
| System | Expo SDK 55 mobile app, iOS AVFoundation via `expo-video` |
| Evidence sources | User runtime log, source code, git diff, validation output |

## Problem Statement

The Labor Dance video stopped playing in streaming mode. The reported warning shows audio and subtitle track loading failed for the Google Drive direct-download URL with a CoreMedia byte-range mismatch.

## Evidence Inventory

| Source | Status | Notes |
| --- | --- | --- |
| User log | Available | Failing URL exactly matches the generated `drive.usercontent.google.com/download?...confirm=t` playback URL. |
| Source code | Available | `apps/mobile/src/features/session/labor-dance-video.ts:16` generated the failing URL before the fix. |
| Tests | Available | Tests referenced cache helper exports that were not implemented before the fix. |
| Live Google Drive response | Missing | Not fetched during this investigation; the log already captures the failing response shape. |

## Confirmed Findings

### Finding 1: Playback used Google Drive direct download as the remote media source

**Evidence:** `apps/mobile/src/features/session/labor-dance-video.ts:16`

**Detail:** The helper transformed the Drive file id into `https://drive.usercontent.google.com/download?id=...&export=download&confirm=t`, matching the URL in the warning.

### Finding 2: The cache/download refactor was incomplete

**Evidence:** `apps/mobile/src/features/session/labor-dance-video.test.ts:6`, `apps/mobile/src/features/session/labor-dance-video.test.ts:7`

**Detail:** Tests imported `getGoogleDriveFileId` and `getLaborDanceVideoCacheFileName`, but those functions were not exported before the fix, so mobile typecheck failed.

## Deduced Conclusions

### Deduction 1: Google Drive is returning a non-media response during AVFoundation range loading

**Based on:** User log and Finding 1.

**Reasoning:** AVFoundation track loading expects a byte range from the MP4 but receives 2009 bytes. That size is consistent with a small intermediary response rather than the requested 297990577-byte media content.

**Conclusion:** The failure is not caused by the fullscreen landscape changes. It is caused by treating Google Drive's direct-download endpoint as a streamable video source.

## Source Code Trace

| Element | Detail |
| --- | --- |
| Error origin | iOS AVFoundation while `expo-video` loads remote tracks |
| Trigger | Opening Labor Dance video with the Google Drive transformed URL |
| Condition | Remote URL serves a short response during byte-range loading |
| Related files | `apps/mobile/src/features/session/labor-dance-video.ts`, `apps/mobile/src/features/session/use-labor-dance-video-player.ts`, `apps/mobile/src/features/session/labor-dance-video-sheet.tsx` |

## Conclusion

**Confidence:** High

The evidence shows a remote streaming failure from Google Drive's direct-download endpoint. The implemented mitigation prepares a cached local MP4 first and gives `expo-video` the local file URI, with a guard that rejects tiny non-video downloads.

## Recommended Next Steps

### Fix direction

Use a local cached MP4 for the current Google Drive source. For true streaming, host the MP4/HLS asset on storage that supports stable `Range` requests and correct video content headers.

### Diagnostic

On device, open the Labor Dance video and confirm the UI shows "Mengunduh video..." once, then plays from cache on later opens.

## Reproduction Plan

1. Use the previous remote `drive.usercontent.google.com/download` URL as the `expo-video` source.
2. Open the video on iOS.
3. Observe AVFoundation warnings for track loading and byte-range length mismatch.
