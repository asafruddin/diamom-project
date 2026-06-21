---
project_name: DiaMom
user_name: Achmad
date: "2026-06-21"
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - code_quality
  - workflow_rules
  - critical_dont_miss
existing_patterns_found: 12
---

# Project Context for AI Agents

_Lean implementation rules for DiaMom. Read `AGENTS.md` first for product boundary, safety, privacy, and workflow. This file covers unobvious code patterns agents miss._

---

## Technology Stack & Versions

| Layer           | Version / tool                                         |
| --------------- | ------------------------------------------------------ |
| Expo SDK        | `~55.0.25`                                             |
| React Native    | `0.83.6` (New Architecture required)                   |
| React           | `19.2.0`                                               |
| Expo Router     | `~55.0.15` (`expo-router/entry`, typed routes enabled) |
| Node.js         | `20.19.x` minimum                                      |
| Package manager | `pnpm@11.1.1`                                          |
| TypeScript      | `~5.9.2`, `strict: true`                               |
| State           | Zustand `^5.0.13` + backend-backed participant store   |
| Tests           | Node test runner + `tsx` (not Jest yet)                |
| Lint            | `eslint-config-expo` via `pnpm lint`                   |

**Expo install rule:** `pnpm expo install <pkg>` for Expo/RN native packages — never hand-pick SDK versions.

**Experiments enabled:** `typedRoutes`, `reactCompiler` in `app.json`.

---

## Critical Implementation Rules

### Language-Specific (TypeScript)

- Mobile app code lives in `apps/mobile`. Use path alias `@/` → `apps/mobile/src/` within the mobile package.
- Export pure decision functions from `apps/mobile/src/features/*` or `apps/mobile/src/lib/*`; keep them testable without RN runtime.
- Prefer explicit return types on gating/routing helpers (`GatingResult`, `DiaMomEntryRoute`).
- Use `as const` for theme tokens and fixed string unions.
- Do not use `any` to bypass route or safety types.

### Framework-Specific (Expo Router + React Native)

- **Routes:** `apps/mobile/app/**/*.tsx` = mobile screens only. Navigation via `router.push()` / `router.replace()` from `expo-router`.
- **Entry routing:** All initial-route logic in `apps/mobile/src/features/entry/entry-routing.ts`. Screens pass store flags into `getInitialDiaMomRoute()` — never inline duplicate conditions in `apps/mobile/app/index.tsx`.
- **Safe areas:** Wrap full screens with `SafeAreaView` from `react-native-safe-area-context`.
- **Styling:** Use `diamomTheme` from `@/theme` (`colors`, `spacing`). Avoid ad-hoc hex values when a token exists.
- **Pressables:** Set `accessibilityRole="button"` and Bahasa `accessibilityLabel` on primary actions.
- **Stores:** Use Zustand as the in-memory UI layer only. Participant profile, disclaimer state, safety screening, and VAS history must be fetched from and written to the backend database. Keep only anonymous participant tokens and researcher tokens in `expo-secure-store`.
- **Copy:** User-visible strings in Bahasa Indonesia, claim-safe. Pull disclaimers from `apps/mobile/src/content/disclaimers.id.json` / `apps/mobile/src/constants/claim-safe-copy.ts`.
- **Safety gating:** Return `GatingResult` with `decision: 'allow' | 'block'`, Bahasa `message`, and `canAccessEducation`. Blocked guided activity may still allow education (`canAccessEducation: true`).
- **Analytics:** Only via `logAnalyticsEvent()` in `apps/mobile/src/lib/analytics.ts`. Event union is fixed — extend the type when adding events. Params pass through `redactSensitiveData()`.
- **Research sync:** Researcher auth tokens and anonymous participant session tokens must use `expo-secure-store`. Participant domain data is database-first; do not reintroduce `AsyncStorage` persistence for onboarding or VAS records.

### Testing Rules

- Colocate `*.test.ts` next to the module under its package `src/`.
- Use `node:test` + `node:assert` (see `entry-routing.test.ts`).
- Run: `pnpm test`.
- Test pure functions: routing, validation, safety gating, copy guardrails, redaction, content governance.
- Assert exact route strings, decision enums, and redacted output — no snapshots for safety logic.

### Code Quality & Style

- ESLint: `pnpm lint` (Expo config).
- Typecheck: `pnpm typecheck` after route or type changes.
- File naming: `kebab-case.ts` for modules; route files match Expo Router paths (`safety-screening.tsx`).
- Mobile feature folders: `apps/mobile/src/features/<area>/` with logic + optional `*-store.ts` + tests.
- Backend feature folders: `apps/api/src/` for route/auth code, `packages/db/src/` for schema/helpers, `packages/contracts/src/` for shared types.
- Constants: mobile product rules in `apps/mobile/src/constants/`.
- Content JSON: `*.id.json` suffix for Bahasa static content.

### Development Workflow

- Read story AC in `docs/implementation-artifacts/` before coding.
- Run `pnpm typecheck && pnpm test && pnpm lint` for story work; `pnpm doctor` when touching deps/native config.
- Update story File List, Debug Log References, and `sprint-status.yaml` on completion.
- No commits/PRs unless user asks.

### Critical Don't-Miss Rules

- **Never** log profile, VAS, safety answers, or emergency contacts — use `redactSensitiveData()` / `SENSITIVE_KEYS`.
- **Never** add any new backend surface beyond the consented researcher flow without PRD + story authorization; analytics stays privacy-safe and no sensitive values reach logs.
- **Never** weaken `experiments.typedRoutes` — fix types after route changes.
- **Never** tell users to continue after `emergency_stop` or warning-sign blocks.
- **Never** put business rules in `apps/mobile/app/*.tsx` — extract to `apps/mobile/src/features/`.
- **Never** claim medical outcomes in UI; VAS = self-reported comfort only.
- Entry to home requires both flags: `hasAcceptedDisclaimer` and `hasCompletedSafetyScreening`. Researcher auth must stay in a separate route flow from participant onboarding and tabs.

---

## Brownfield Entry Points

| Concern                    | File                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| Initial route              | `apps/mobile/src/features/entry/entry-routing.ts`                            |
| Profile / onboarding state | `apps/mobile/src/features/onboarding/profile-store.ts` (`OnboardingState`)   |
| Research sync state        | `apps/mobile/src/features/research/research-sync-store.ts`                   |
| Researcher auth state      | `apps/mobile/src/features/research/researcher-auth-store.ts`                 |
| Safety gating              | `apps/mobile/src/features/session/safety-gating.ts`                          |
| Safety copy constants      | `apps/mobile/src/constants/safety.ts`                                        |
| Privacy / redaction        | `apps/mobile/src/constants/privacy.ts`, `apps/mobile/src/lib/sensitive-data.ts`          |
| Claim-safe copy            | `apps/mobile/src/constants/claim-safe-copy.ts`, `apps/mobile/src/lib/copy-guardrails.ts` |
| Analytics                  | `apps/mobile/src/lib/analytics.ts`                                           |
| Theme                      | `apps/mobile/src/theme/index.ts`, `apps/mobile/src/constants/theme.ts`                   |
| Neon schema/helpers        | `packages/db/src/index.ts`, `packages/db/src/schema.ts`                      |
| Shared contracts           | `packages/contracts/src/index.ts`                                            |

---

## Usage Guidelines

**For AI agents:** Read `AGENTS.md` then this file before implementing. Prefer extending existing modules over new abstractions.

**For humans:** Keep lean; update when stack or patterns change. Remove rules that become obvious.

Last Updated: 2026-06-21
