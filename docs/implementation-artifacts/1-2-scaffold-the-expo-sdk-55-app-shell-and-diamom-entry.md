# Story 1.2: Scaffold the Expo SDK 55 App Shell and DiaMom Entry

Status: done

## Story

As a first-time or returning user,
I want to open DiaMom and see a branded first screen,
so that I understand I am in the right app and can start the correct flow.

## Acceptance Criteria

1. **Expo SDK 55 app shell exists**
   **Given** the project currently has BMAD docs but no app code
   **When** the app shell is scaffolded
   **Then** the implementation creates the Expo app under ``
   **And** it uses Expo SDK 55, Expo Router, TypeScript, and React Native New Architecture-compatible defaults.

2. **Branded Bahasa Indonesia entry screen exists**
   **Given** the app is installed on Android
   **When** the user opens DiaMom
   **Then** the first visible screen shows the DiaMom identity
   **And** it shows a Bahasa Indonesia `Mulai` entry action
   **And** visible copy stays within the support/education product boundary from Story 1.1.

3. **First-time routing is defined**
   **Given** onboarding or disclaimer consent is incomplete
   **When** the entry route evaluates the user state
   **Then** first-time users are routed toward `/onboarding/intro`
   **And** the onboarding intro placeholder is reachable from the `Mulai` action.

4. **Returning-user routing is defined**
   **Given** onboarding is complete and disclaimer consent is accepted
   **When** the entry route evaluates the user state
   **Then** returning users are routed toward `/(tabs)/home`
   **And** the home dashboard placeholder is reachable in the route tree.

5. **Architecture conventions are established**
   **Given** later stories will add onboarding, safety screening, sessions, VAS, history, and settings
   **When** the app shell is complete
   **Then** the folder structure follows `docs/ARCHITECTURE.md` route and `src/` conventions
   **And** package scripts include start, Android, typecheck, lint or doctor, and test commands that can be run by later stories.

## Tasks / Subtasks

- [x] Scaffold the Expo SDK 55 application shell (AC: 1, 5)
  - [x] Create `` from the Expo SDK 55 default template.
  - [x] Keep generated app code inside ``; do not move BMAD docs into the app folder.
  - [x] Verify `package.json`, app config, TypeScript config, and Expo Router setup exist.

- [x] Establish the route tree and first app entry (AC: 2, 3, 4, 5)
  - [x] Create or update `app/_layout.tsx`.
  - [x] Create or update `app/index.tsx` as the branded DiaMom entry screen.
  - [x] Create placeholder routes for `app/onboarding/intro.tsx` and `app/(tabs)/home.tsx`.
  - [x] Ensure tapping `Mulai` routes to `/onboarding/intro`.

- [x] Add deterministic entry-routing logic (AC: 3, 4)
  - [x] Add a small route decision helper under `src/features/entry/`.
  - [x] Return `/onboarding/intro` unless both onboarding completion and disclaimer consent are true.
  - [x] Return `/(tabs)/home` only when both onboarding completion and disclaimer consent are true.
  - [x] Keep the helper pure so Story 2 can later wire real local persistence without changing the contract.

- [x] Add DiaMom visual and copy foundation (AC: 2, 5)
  - [x] Add initial theme tokens under `src/theme/`.
  - [x] Use Bahasa Indonesia entry copy including `DiaMom` and `Mulai`.
  - [x] Avoid medical claims, pain-reduction guarantees, diagnosis, treatment, emergency-triage, or replacement-of-care language.

- [x] Add basic tests and validation scripts (AC: 1, 3, 4, 5)
  - [x] Add tests for the route decision helper.
  - [x] Run typecheck.
  - [x] Run the available test command.
  - [x] Run Expo Doctor or an equivalent Expo compatibility check if dependencies are installed.

## Dev Notes

### Source Requirements

- `docs/planning-artifacts/epics.md` Story 1.2 requires Android launch, DiaMom identity, Bahasa Indonesia `Mulai`, first-time routing to onboarding, returning-user routing to home, Expo SDK 55, Expo Router, React Native New Architecture, and architecture folder conventions.
- `docs/ARCHITECTURE.md` Sections 1-2 require Expo SDK 55, React Native 0.83.x, React 19.2.x, Node.js 20.19.x minimum, React Native New Architecture only, and explicit `default@sdk-55` template usage during the SDK 55 transition.
- `docs/ARCHITECTURE.md` Sections 4-6 define the app route groups, main tabs, protected entry logic, feature-first architecture, local-first data stance, service/repository layering, and `src/` folder layout.
- `docs/ARCHITECTURE.md` Sections 19 and 21 define expected scripts and testing strategy.
- `docs/planning-artifacts/product-foundation.md` from Story 1.1 defines DiaMom as a support and education companion only; do not add copy that implies diagnosis, treatment, medical advice, emergency triage, clinical decision support, guaranteed easier labor, or guaranteed medical pain reduction.

### Latest Technical Notes

- Official Expo `create-expo-app` documentation states SDK 55 projects should be created with `pnpm create expo-app --template default@sdk-55`; during the transition, omitting the template may create an SDK 54 project. Source: https://docs.expo.dev/more/create-expo/
- Official Expo New Architecture documentation states SDK 55 uses React Native 0.83 and the New Architecture cannot be disabled in React Native 0.82+. Source: https://docs.expo.dev/guides/new-architecture/
- Official Expo app config documentation states the app config belongs at the project root next to `package.json`; for this repository that means `app.json` or `app.config.ts`. Source: https://docs.expo.dev/workflow/configuration

### Architecture Compliance

- App root for this story: ``.
- Required route files for this story:
  - `app/_layout.tsx`
  - `app/index.tsx`
  - `app/onboarding/intro.tsx`
  - `app/(tabs)/_layout.tsx`
  - `app/(tabs)/home.tsx`
- Required source-area files for this story:
  - `src/features/entry/entry-routing.ts`
  - `src/features/entry/entry-routing.test.ts`
  - `src/theme/index.ts`
- Do not implement full onboarding, consent persistence, safety screening, local database, emergency contact, VAS, session timer, notifications, audio, analytics, or production build setup in this story.
- The entry screen may use placeholder state for first launch, but the pure route helper must support both first-time and returning-user cases so later stories can plug in real local state.

### Previous Story Intelligence

- Story 1.1 created `docs/planning-artifacts/product-foundation.md` and moved to review.
- Preserve Story 1.1 product boundary language. User-facing app copy must not claim medical effectiveness or replace doctor/midwife care.
- Current project is documentation-first with no React Native app code before this story.
- Story 1.1 has not yet passed code review; treat its product foundation as useful context but keep the final sprint status risk visible.

### Testing / Validation

- Add unit coverage for:
  - First-time user state routes to `/onboarding/intro`.
  - Missing disclaimer consent routes to `/onboarding/intro`.
  - Completed onboarding plus accepted disclaimer routes to `/(tabs)/home`.
- Run from ``:
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm doctor` or `pnpm expo-doctor` when available
- Manual validation:
  - `pnpm start` launches Expo.
  - Android launch shows DiaMom identity and `Mulai`.
  - Tapping `Mulai` navigates to onboarding intro placeholder.
  - `/(tabs)/home` route exists for returning-user routing.

### Project Structure Notes

- This repository root stores BMAD docs and planning artifacts. The Expo project should be scaffolded in `` to match the architecture document and avoid overwriting BMAD files.
- If `create-expo-app` produces a slightly different default file set, preserve the generated SDK 55 conventions and add only the minimal route/source files needed for this story.
- Do not commit generated native `android/` or `ios/` folders unless the SDK 55 template creates them by default. Prefer managed Expo app shell for this story.

### References

- [epics.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/epics.md)
- [ARCHITECTURE.md](/Users/achmad/Development/react-native/diamom-project/docs/ARCHITECTURE.md)
- [product-foundation.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/product-foundation.md)
- [Expo create-expo-app](https://docs.expo.dev/more/create-expo/)
- [Expo New Architecture](https://docs.expo.dev/guides/new-architecture/)
- [Expo app config](https://docs.expo.dev/workflow/configuration)

## Open Questions

- Should the final production display name be `DiaMom` or `DiaMom Mobile App` in Android launcher metadata?
- Should the first visual identity use final brand assets later, or keep this story to token-based styling until design assets are available?

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

- `pnpm create expo-app . --template default@sdk-55 --yes`
- `pnpm install`
- `pnpm typecheck`
- `pnpm test`
- `pnpm lint`
- `pnpm doctor`
- `ruby -e 'require "yaml"; YAML.load_file("docs/implementation-artifacts/sprint-status.yaml"); puts "valid yaml"'`

### Completion Notes List

- Created `` with the official Expo SDK 55 default template, preserving BMAD docs at the repository root.
- Moved active Expo Router routes to the architecture-aligned `app/` tree and added DiaMom entry, onboarding intro, and home dashboard placeholder screens.
- Added pure first-launch/returning-user route decision logic with unit tests covering onboarding and disclaimer consent states.
- Added DiaMom theme tokens, Bahasa Indonesia entry copy, Expo Doctor/lint/typecheck/test scripts, ESLint config, and CSS module typing required by the SDK 55 template.
- Validation passed: typecheck, tests, lint, Expo Doctor, pnpm add during installs, and sprint-status YAML parsing.
- BMAD code review caught the SDK template route-root edge case where an empty `src/app/` directory made Expo Router ignore the architecture-aligned `app/` tree; removed the empty directory and revalidated the web server route root.
- Fixed the unused generated web tab helper so typed routes remain valid after removing the default `/explore` route.

### File List

- AGENTS.md
- CLAUDE.md
- README.md
- app.json
- app/_layout.tsx
- app/index.tsx
- app/(tabs)/_layout.tsx
- app/(tabs)/home.tsx
- app/onboarding/intro.tsx
- assets/
- eslint.config.js
- pnpm-lock.yaml
- package.json
- scripts/reset-project.js
- src/
- src/components/app-tabs.web.tsx
- src/features/entry/entry-routing.test.ts
- src/features/entry/entry-routing.ts
- src/theme/index.ts
- src/types/css-modules.d.ts
- tsconfig.json
- docs/implementation-artifacts/1-2-scaffold-the-expo-sdk-55-app-shell-and-diamom-entry.md
- docs/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-05-21 - Created Story 1.2 with comprehensive implementation context and set status to ready-for-dev.
- 2026-05-21 - Implemented Story 1.2 app shell, entry routing, tests, and validation; moved story to review.
- 2026-05-21 - Completed code review, fixed route-root and typed-route follow-ups, and moved story to done.
