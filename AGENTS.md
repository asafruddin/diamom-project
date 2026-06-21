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

**Current platform:** Android-first monorepo with `apps/mobile` participant + researcher flows, `apps/api` backend, Neon database support, and consent-based research sync. No iOS production, English UI, CMS, AI, or exports unless a story and PRD authorize them.

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

- `apps/mobile/app/` — Expo Router screens only
- `apps/mobile/src/features/` — mobile business logic, stores, route decisions, tests
- `apps/mobile/src/lib/` — analytics, redaction, guardrails
- `apps/mobile/src/constants/` — safety, privacy, claim-safe, traceability
- `apps/mobile/src/content/` — Bahasa JSON content
- `apps/api/src/` — Fastify routes, auth, backend entrypoints
- `packages/db/src/` — Neon/Drizzle schema and typed helpers
- `packages/contracts/src/` — shared API/request/response types
- `docs/` — PRD, architecture, stories, **`project-context.md`**

Aliases in mobile: `@/*` → `src/*`, `@/assets/*` → `assets/*`. Treat `apps/mobile` as the Expo app root.

Layering and naming: **`docs/project-context.md`**.

---

## 6. Safety, Privacy, Claim-Safe

**Sensitive data:** names, pregnancy week, due date, provider approval, emergency contacts, safety answers, VAS, activity history, notes.

- Local storage remains the default for participant health data until explicit research consent is granted.
- Consent-based sync to the Neon backend is allowed only for the research flow; do not add any other cloud sync, CMS, AI, or exports without PRD + story.
- No sensitive values in console, analytics, or crash reports.
- Use `apps/mobile/src/lib/sensitive-data.ts`, `apps/mobile/src/constants/privacy.ts`, `apps/mobile/src/lib/analytics.ts`.
- Use `apps/mobile/src/content/disclaimers.id.json`, `apps/mobile/src/constants/claim-safe-copy.ts`, `apps/mobile/src/lib/copy-guardrails.ts`.
- VAS = self-reported comfort only — never medical proof.
- Emergency stop must never urge continuation; warning signs block with calm Bahasa guidance.
- Reuse `apps/mobile/src/features/session/safety-gating.ts` and `apps/mobile/src/constants/safety.ts`.

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
- Keep participant domain data in the approved backend database. Use secure local storage only for session tokens or transient device credentials.

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
- [ ] Sensitive data redacted from logs/analytics and synced only through the consented research flow
- [ ] Mobile routes in `apps/mobile/app/`, mobile logic in `apps/mobile/src/`
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm lint` run (or explained)
- [ ] Story + sprint status updated if applicable
- [ ] No unauthorized MVP scope expansion
