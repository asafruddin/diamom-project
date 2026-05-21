# Story 2.6: Add Complete Pregnancy Exercise Warning Signs

Status: ready-for-dev

## Story

As a pregnant mother,
I want warning signs to be complete and visible,
so that I know when to stop and seek help.

## Acceptance Criteria

1. **Given** safety guidance appears in onboarding, pre-session checks, movement details, or emergency screens  
   **When** warning signs are displayed  
   **Then** they include bleeding, dizziness/faintness, severe or unusual pain, severe shortness of breath, chest pain, headache, muscle weakness, calf pain/swelling, regular painful contractions, and leaking/gushing fluid  
   **And** warning-sign copy is reviewed through the content governance process  
   **And** warning-sign content is available in Bahasa Indonesia  
   **And** warning signs are not hidden behind optional or decorative UI.

## Tasks / Subtasks

- [ ] Confirm story scope and existing implementation (AC: all)
  - [ ] Read this story, `docs/planning-artifacts/epics.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`, and `docs/planning-artifacts/product-foundation.md`.
  - [ ] Inspect existing files before editing, especially src/constants/safety.ts, src/content/disclaimers.id.json.
  - [ ] Preserve Story 1.2 app shell patterns: Expo Router under `app/`, reusable code under `src/`, strict TypeScript, and existing scripts.

- [ ] Implement Add Complete Pregnancy Exercise Warning Signs (AC: 1)
  - [ ] Create or update the route, feature, service, store, repository, content, or component files identified in Dev Notes.
  - [ ] Keep user-facing copy in Bahasa Indonesia unless the text is an internal developer artifact.
  - [ ] Keep DiaMom within support/education boundaries; do not add medical advice, diagnosis, treatment, emergency triage, or guaranteed outcome claims.

- [ ] Add safety, privacy, and offline guardrails (AC: 1)
  - [ ] Keep sensitive values out of console logs, analytics events, crash payloads, and remote debugging output.
  - [ ] Use local-first behavior; do not introduce backend, cloud sync, provider dashboard, CMS, AI, or English localization in this story.
  - [ ] Show calm, actionable empty/error/safety states where the story can fail or block.

- [ ] Add focused tests and validation (AC: 1)
  - [ ] Add unit tests for pure logic introduced by the story.
  - [ ] Add component or integration tests when the story introduces UI state, routing, repositories, or session behavior.
  - [ ] Run `pnpm typecheck`, `pnpm test`, `pnpm lint`, and targeted manual validation from the repository root.

## Dev Notes

### Epic Context

**Safe Onboarding, Pregnancy Profile, Consent, and Activity Eligibility** — First-time users can create a pregnancy profile, accept the disclaimer, complete safety screening, and receive clear activity eligibility guidance before any guided movement session is available.

Onboarding and eligibility story: wire local profile/consent/safety state without bypassing medical boundary or activity locks.

### Source Requirements

- `docs/planning-artifacts/epics.md` Story 2.6 is the source of truth for the story statement and acceptance criteria.
- `docs/PRD.md` defines the medical/safety boundary, feature requirements, non-functional requirements, data models, analytics limitations, edge cases, MVP scope, release plan, success metrics, and content governance expectations.
- `docs/ARCHITECTURE.md` defines Expo SDK 55, Expo Router, React Native New Architecture, feature-first structure, local-first data, SQLite repositories, Zustand state, static JSON content, session engine, VAS mapping, notifications, audio, emergency contact, privacy/security, design tokens, scripts, and testing strategy.
- `docs/planning-artifacts/product-foundation.md` defines product boundary, non-goals, glossary, user journeys, safety guardrails, privacy guardrails, claim-safe result language, and traceability notes.

### Architecture Compliance

- App root: repository root.
- Routes belong under `app/`; reusable UI, hooks, services, stores, content, db, and utilities belong under `src/`.
- Follow Expo Router typed route behavior. If routes change, regenerate/check types by running the app or typecheck.
- Preserve strict TypeScript and existing scripts in `package.json`.
- Use local-first storage and static content unless the story explicitly calls for a repository or system API.
- Do not introduce backend account, cloud sync, provider dashboard, admin CMS, PDF export, iOS production work, English release, AI voice recap, personalized medical recommendations, or medical-device behavior.

### Likely Files / Areas To Touch

- `src/constants/safety.ts`
- `src/content/disclaimers.id.json`

Before modifying any UPDATE file, read it completely and preserve existing behavior that later stories depend on.

### Safety and Privacy Guardrails

- User-facing copy must be Bahasa Indonesia and claim-safe.
- DiaMom is support and education only; it must not diagnose, treat, recommend medical action, triage emergencies, guarantee pain reduction, or replace doctor/midwife care.
- Sensitive data includes name, pregnancy week, due date, provider approval, emergency contacts, safety answers, VAS scores, activity history, and notes.
- Do not log sensitive values or send them to analytics/crash reporting.
- Hard blocks, warnings, high VAS guidance, emergency stop, and delete-local-data behavior must be deterministic and testable when relevant.

### Previous Story Intelligence

- Previous available story key: `2-5-implement-safety-gating-and-education-only-access`.
- Story 1.2 established the Expo SDK 55 app shell at the repository root, active routes under `app/`, reusable code under `src/`, and scripts for typecheck/test/lint/doctor.
- Story 1.1 remains in review in sprint tracking; still use `product-foundation.md` as product-boundary context, but keep its review status visible in sprint reports.

### Testing / Validation

- Add tests near the changed feature area using the current `pnpm test` setup unless the story introduces a stronger local pattern.
- Always run from the repository root: `pnpm typecheck`, `pnpm test`, and `pnpm lint`.
- Run `pnpm doctor` when dependencies, Expo config, native modules, notifications, audio, SQLite, or release readiness are touched.
- For UI stories, manually verify the relevant route on mobile-sized viewport and ensure text does not overlap or imply medical claims.

### References

- [epics.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/epics.md)
- [PRD.md](/Users/achmad/Development/react-native/diamom-project/docs/PRD.md)
- [ARCHITECTURE.md](/Users/achmad/Development/react-native/diamom-project/docs/ARCHITECTURE.md)
- [product-foundation.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/product-foundation.md)

## Open Questions

- Confirm final clinical reviewer identity before marking medical-adjacent content release-ready.
- Confirm whether each story's user-facing copy should stay Bahasa Indonesia only or include developer comments in English where helpful.

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

### Completion Notes List

### File List

## Change Log

- 2026-05-21 - Created story context from epics, PRD, architecture, product foundation, and current app shell.
