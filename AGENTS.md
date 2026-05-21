# DiaMom Agent Instructions

These instructions apply to every agentic AI working in this repository. `CLAUDE.md` points here.

## Two-File Model

| File | Purpose |
|---|---|
| **`AGENTS.md`** (this file) | Product boundary, safety/privacy, workflow, BMAD, validation — always read first |
| **`docs/project-context.md`** | Lean code patterns, stack versions, brownfield entry points — read before implementing |

Do not duplicate `project-context.md` rules here. When coding, follow both files; when they overlap, the more restrictive rule wins.

---

## Quick Orientation

| Topic | Reference |
|---|---|
| Product scope, MVP boundaries | `docs/PRD.md` |
| Technical design, folder layout | `docs/ARCHITECTURE.md` |
| Safety, privacy, glossary, journeys | `docs/planning-artifacts/product-foundation.md` |
| Epics and stories | `docs/planning-artifacts/epics.md` |
| Story specs / AC | `docs/implementation-artifacts/*.md` |
| Sprint progress | `docs/implementation-artifacts/sprint-status.yaml` |
| **Code patterns and stack** | **`docs/project-context.md`** |

**Current focus:** Epics 1–2 done; Epics 3–5 in progress (`ready-for-dev`). Check `sprint-status.yaml` before picking work.

**MVP platform:** Android-first. No iOS production, English UI, backend, cloud sync, CMS, AI, or exports unless a story and PRD authorize them.

---

## 1. Expo SDK 55 (Non-Negotiable)

Before app code changes, consult Expo SDK 55 docs:

- https://docs.expo.dev/versions/v55.0.0/
- https://docs.expo.dev/versions/v55.0.0/sdk/router/

Exact versions and install rules: **`docs/project-context.md`**.

Use `pnpm expo install` for Expo/RN packages. Do not guess versions or rely on pre-SDK-55 behavior.

---

## 2. Product Boundary

DiaMom is a pregnancy **support and education** companion: Labor Dance education, breathing guidance, guided movement, and self-reported VAS comfort tracking.

**Never present DiaMom as:** a medical device, diagnostic tool, treatment system, emergency triage, replacement for clinical care, proof of pain reduction, or guarantee of labor outcomes.

**Required meaning in user-facing copy:**

> DiaMom is for support and education only. It is not a replacement for medical advice, diagnosis, or treatment. Always follow guidance from a doctor, midwife, or healthcare provider. Stop immediately if you feel unsafe or uncomfortable.

User-facing copy: **Bahasa Indonesia** unless a story says otherwise.

---

## 3. Read Before Acting

1. `docs/PRD.md` — requirements, MVP scope, analytics limits
2. `docs/ARCHITECTURE.md` — structure, navigation, storage, build
3. `docs/planning-artifacts/product-foundation.md` — safety/privacy guardrails
4. Active story in `docs/implementation-artifacts/` (if applicable)
5. **`docs/project-context.md`** — before writing code
6. Existing source in the target area

Stop and surface conflicts between story, PRD, architecture, and these instructions — do not silently pick one.

---

## 4. Execution Workflow

1. Identify requirement / story acceptance criteria.
2. Inspect current implementation.
3. Scope changes to the requested behavior only.
4. Reuse existing patterns (`docs/project-context.md` entry points).
5. Add focused tests for logic, gating, routing, redaction, copy rules.
6. Run validation (section 9).
7. Update story artifact + `sprint-status.yaml` when story-based.

**Git:** No commits, branches, or PRs unless the user explicitly asks. No secrets in git. No force-push to `main`.

---

## 5. Project Structure (Summary)

- `app/` — Expo Router screens only
- `src/features/` — business logic, stores, route decisions, tests
- `src/lib/` — analytics, redaction, guardrails
- `src/constants/` — safety, privacy, claim-safe, traceability
- `src/content/` — Bahasa JSON content
- `docs/` — PRD, architecture, stories, **`project-context.md`**

Aliases: `@/*` → `src/*`, `@/assets/*` → `assets/*`. Single Expo app at repo root — no nested app.

Layering and naming: **`docs/project-context.md`**.

---

## 6. Safety, Privacy, Claim-Safe

**Sensitive data:** names, pregnancy week, due date, provider approval, emergency contacts, safety answers, VAS, activity history, notes.

- Local storage only for MVP health data.
- No cloud sync, backend, CMS, AI, exports without PRD + story.
- No sensitive values in console, analytics, or crash reports.
- Use `src/lib/sensitive-data.ts`, `src/constants/privacy.ts`, `src/lib/analytics.ts`.
- Use `src/content/disclaimers.id.json`, `src/constants/claim-safe-copy.ts`, `src/lib/copy-guardrails.ts`.
- VAS = self-reported comfort only — never medical proof.
- Emergency stop must never urge continuation; warning signs block with calm Bahasa guidance.
- Reuse `src/features/session/safety-gating.ts` and `src/constants/safety.ts`.

---

## 7. UI Expectations

- Calm, short Bahasa Indonesia copy; claim-safe everywhere.
- `diamomTheme` tokens before new colors/spacing.
- Readable layouts, safe touch targets, accessibility labels on primary actions.
- Build app screens — not marketing pages.

---

## 8. Validation

```bash
pnpm typecheck && pnpm test && pnpm lint
```

Also `pnpm doctor` when touching deps, Expo config, native modules, or routing.

Manual: `pnpm start`, `pnpm android`, `pnpm web` for UI/routing changes.

Explain any skipped checks in the story artifact or response.

---

## 9. Dependencies

- `pnpm` only; `pnpm expo install` for Expo/RN; `pnpm add` for pure JS libs.
- No new dependency if an existing helper suffices.
- No `android/` / `ios/` unless story requires prebuild.
- AsyncStorage for simple prefs today; SQLite for durable health records per architecture.

---

## 10. BMAD Workflow

Skills live in `.agents/skills/`. Invoke when the user requests a BMAD workflow.

| Intent | Skill |
|---|---|
| Implement story | `bmad-dev-story` |
| Quick fix | `bmad-quick-dev` |
| Create story | `bmad-create-story` |
| Code review | `bmad-code-review` |
| Sprint status | `bmad-sprint-status` |
| Regenerate project context | `bmad-generate-project-context` |

**Story artifacts:** Keep `Status` accurate; update File List, Debug Log References, Completion Notes, Change Log; sync `sprint-status.yaml`.

Reviews: lead with findings, risks, missing tests.

---

## 11. Final Checklist

- [ ] Read `docs/project-context.md` before code changes
- [ ] PRD, architecture, product-foundation respected
- [ ] Bahasa Indonesia, claim-safe copy
- [ ] Sensitive data local-only and redacted from logs/analytics
- [ ] Routes in `app/`, logic in `src/`
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm lint` run (or explained)
- [ ] Story + sprint status updated if applicable
- [ ] No unauthorized MVP scope expansion
