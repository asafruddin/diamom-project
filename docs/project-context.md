---
project_name: DiaMom
user_name: Achmad
date: "2026-05-21"
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
| State           | Zustand `^5.0.13` + `persist` + AsyncStorage           |
| Tests           | Node test runner + `tsx` (not Jest yet)                |
| Lint            | `eslint-config-expo` via `pnpm lint`                   |

**Expo install rule:** `pnpm expo install <pkg>` for Expo/RN native packages — never hand-pick SDK versions.

**Experiments enabled:** `typedRoutes`, `reactCompiler` in `app.json`.

---

## Critical Implementation Rules

### Language-Specific (TypeScript)

- Use path alias `@/` → `src/` (e.g. `@/features/entry/entry-routing`, `@/constants/safety`).
- Export pure decision functions from `src/features/*` or `src/lib/*`; keep them testable without RN runtime.
- Prefer explicit return types on gating/routing helpers (`GatingResult`, `DiaMomEntryRoute`).
- Use `as const` for theme tokens and fixed string unions.
- Do not use `any` to bypass route or safety types.

### Framework-Specific (Expo Router + React Native)

- **Routes:** `app/**/*.tsx` = screens only. Navigation via `router.push()` / `router.replace()` from `expo-router`.
- **Entry routing:** All initial-route logic in `src/features/entry/entry-routing.ts`. Screens pass store flags into `getInitialDiaMomRoute()` — never inline duplicate conditions in `app/index.tsx`.
- **Safe areas:** Wrap full screens with `SafeAreaView` from `react-native-safe-area-context`.
- **Styling:** Use `diamomTheme` from `@/theme` (`colors`, `spacing`). Avoid ad-hoc hex values when a token exists.
- **Pressables:** Set `accessibilityRole="button"` and Bahasa `accessibilityLabel` on primary actions.
- **Stores:** Zustand + `persist` + AsyncStorage for onboarding/profile flags. Storage key pattern: `diamom-*-storage`. Long-term health records belong in SQLite when those stories land — not only Zustand.
- **Copy:** User-visible strings in Bahasa Indonesia, claim-safe. Pull disclaimers from `src/content/disclaimers.id.json` / `src/constants/claim-safe-copy.ts`.
- **Safety gating:** Return `GatingResult` with `decision: 'allow' | 'block'`, Bahasa `message`, and `canAccessEducation`. Blocked guided activity may still allow education (`canAccessEducation: true`).
- **Analytics:** Only via `logAnalyticsEvent()` in `src/lib/analytics.ts`. Event union is fixed — extend the type when adding events. Params pass through `redactSensitiveData()`.

### Testing Rules

- Colocate `*.test.ts` next to the module under `src/`.
- Use `node:test` + `node:assert` (see `entry-routing.test.ts`).
- Run: `pnpm test`.
- Test pure functions: routing, validation, safety gating, copy guardrails, redaction, content governance.
- Assert exact route strings, decision enums, and redacted output — no snapshots for safety logic.

### Code Quality & Style

- ESLint: `pnpm lint` (Expo config).
- Typecheck: `pnpm typecheck` after route or type changes.
- File naming: `kebab-case.ts` for modules; route files match Expo Router paths (`safety-screening.tsx`).
- Feature folders: `src/features/<area>/` with logic + optional `*-store.ts` + tests.
- Constants: product rules in `src/constants/` (safety, privacy, claim-safe-copy, traceability).
- Content JSON: `*.id.json` suffix for Bahasa static content.

### Development Workflow

- Read story AC in `docs/implementation-artifacts/` before coding.
- Run `pnpm typecheck && pnpm test && pnpm lint` for story work; `pnpm doctor` when touching deps/native config.
- Update story File List, Debug Log References, and `sprint-status.yaml` on completion.
- No commits/PRs unless user asks.

### Critical Don't-Miss Rules

- **Never** log profile, VAS, safety answers, or emergency contacts — use `redactSensitiveData()` / `SENSITIVE_KEYS`.
- **Never** add Sentry/PostHog/backend until PRD + story authorize; analytics stays dev-console only today.
- **Never** weaken `experiments.typedRoutes` — fix types after route changes.
- **Never** tell users to continue after `emergency_stop` or warning-sign blocks.
- **Never** put business rules in `app/*.tsx` — extract to `src/features/`.
- **Never** claim medical outcomes in UI; VAS = self-reported comfort only.
- Entry to home requires both flags: `hasAcceptedDisclaimer` and `hasCompletedSafetyScreening`. No profile gate — DiaMom is fully anonymous.

---

## Brownfield Entry Points

| Concern                    | File                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| Initial route              | `src/features/entry/entry-routing.ts`                            |
| Profile / onboarding state | `src/features/onboarding/profile-store.ts` (`OnboardingState`)   |
| Safety gating              | `src/features/session/safety-gating.ts`                          |
| Safety copy constants      | `src/constants/safety.ts`                                        |
| Privacy / redaction        | `src/constants/privacy.ts`, `src/lib/sensitive-data.ts`          |
| Claim-safe copy            | `src/constants/claim-safe-copy.ts`, `src/lib/copy-guardrails.ts` |
| Analytics                  | `src/lib/analytics.ts`                                           |
| Theme                      | `src/theme/index.ts`, `src/constants/theme.ts`                   |

---

## Usage Guidelines

**For AI agents:** Read `AGENTS.md` then this file before implementing. Prefer extending existing modules over new abstractions.

**For humans:** Keep lean; update when stack or patterns change. Remove rules that become obvious.

Last Updated: 2026-05-21
