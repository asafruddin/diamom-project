---
title: 'Update splash logo and relocate the VAS CTA'
type: 'feature'
created: '2026-06-27'
status: 'in-review'
baseline_commit: 'a746d1e0cf085e5417f5d009d8895b735399a397'
context:
  - '{project-root}/docs/project-context.md'
  - '{project-root}/docs/planning-artifacts/product-foundation.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The native splash still uses the old splash asset, and the “Lanjut ke Penilaian VAS” action appears on every individual movement detail instead of at the end of the learning sequence.

**Approach:** Configure the Expo SDK 55 splash plugin to use `diamom-logo.png`, remove the VAS CTA from movement details, and place the same accessible action at the end of the closing material while preserving its existing VAS destination.

## Boundaries & Constraints

**Always:** Preserve unrelated working-tree changes, including the adaptive icon update and closing-screen image layout. Keep the CTA label and accessibility label in Bahasa Indonesia, use the shared `ActionButton`, retain the typed `/(tabs)/vas` route, and limit splash changes to the existing `expo-splash-screen` plugin configuration.

**Ask First:** Any change to the CTA destination, session safety-gating flow, splash sizing/background, or other app icon assets requires separate approval.

**Never:** Add dependencies, regenerate native projects, modify VAS/session behavior, introduce new medical claims, or change material content beyond relocating the existing action.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| App launch | A newly built Android app starts | Native splash displays `diamom-logo.png` with the existing contain mode, width, and background | Expo config must resolve the asset path; release-build visual QA remains required |
| Valid movement | User opens any movement detail | Safety and instructional content remains, with no VAS CTA | Existing movement navigation remains unchanged |
| Missing movement | Unknown movement slug | Existing “Kembali ke Gerakan” recovery action remains available | Replace navigation behavior is preserved |
| Closing material | User reaches the Penutup screen and taps the CTA | “Lanjut ke Penilaian VAS” navigates to `/(tabs)/vas` | Existing VAS screen owns downstream behavior |

</frozen-after-approval>

## Code Map

- `apps/mobile/app.json` -- Expo SDK 55 `expo-splash-screen` config; currently references `splash-screen.png` globally and in platform overrides.
- `apps/mobile/assets/icon/diamom-logo.png` -- Existing 1302×588 RGBA logo requested for the splash.
- `apps/mobile/app/(tabs)/materials/movement/[slug].tsx` -- Movement detail route containing both the VAS CTA and a separate missing-slug recovery button.
- `apps/mobile/app/(tabs)/materials/closing.tsx` -- Final learning material screen and new owner of the VAS CTA.
- `apps/mobile/src/components/dia-ui.tsx` -- Shared `ActionButton` supplies button semantics and accessibility defaults.

## Tasks & Acceptance

**Execution:**
- [x] `apps/mobile/app.json` -- replace all three splash image references with `./assets/icon/diamom-logo.png` while retaining existing plugin options and unrelated edits.
- [x] `apps/mobile/app/(tabs)/materials/movement/[slug].tsx` -- remove only the valid-movement VAS CTA, keeping the missing-slug recovery action intact.
- [x] `apps/mobile/app/(tabs)/materials/closing.tsx` -- add the shared accessible CTA after the closing content and route it to `/(tabs)/vas`.

**Acceptance Criteria:**
- Given Expo resolves the mobile config, when a new native binary is built, then the splash plugin uses `diamom-logo.png` for its base, Android, and iOS image values.
- Given a valid movement detail, when it renders, then it does not show “Lanjut ke Penilaian VAS,” while an invalid slug still offers “Kembali ke Gerakan.”
- Given the closing screen, when the user taps “Lanjut ke Penilaian VAS,” then Expo Router pushes `/(tabs)/vas`.

## Spec Change Log

## Design Notes

Expo SDK 55 recommends the `expo-splash-screen` config plugin and notes that plugin properties require a new app binary. Expo Go and development builds do not fully reproduce the final Android splash, so configuration checks are automated but final appearance needs release-build QA.

The preserved VAS route reflects the user’s request to move the existing button. This does not resolve the broader PRD/product-foundation requirement for a pre-session safety check before VAS; changing that flow is explicitly outside this small relocation.

## Verification

**Commands:**
- `pnpm typecheck` -- expected: all workspace TypeScript checks pass.
- `pnpm test` -- expected: all existing tests pass.
- `pnpm lint` -- expected: all lint checks pass.
- `pnpm doctor` -- expected: Expo SDK/config validation passes after the splash configuration change.

**Manual checks:**
- Open a movement detail and confirm the VAS CTA is absent; open Penutup and confirm the CTA is visible and reaches the VAS-before screen.
- Build/run a release binary to confirm the requested logo’s final native splash rendering.
