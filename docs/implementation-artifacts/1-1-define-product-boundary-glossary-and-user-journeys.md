# Story 1.1: Define Product Boundary, Glossary, and User Journeys

Status: review

## Story

As a product team,
I want the DiaMom product boundary, glossary, and core user journeys documented,
so that every later implementation story uses the same safety language and user-value frame.

## Acceptance Criteria

1. **Product boundary is explicit**
   **Given** the existing PRD and validation report
   **When** the product foundation document is created
   **Then** it defines DiaMom as a support and education companion, not medical advice, diagnosis, treatment, emergency triage, or clinical decision support
   **And** it explicitly prohibits claims that DiaMom guarantees easier labor, medically reduces pain, diagnoses conditions, recommends treatment, or replaces doctor/midwife care.

2. **Glossary is complete and reusable**
   **Given** future stories will reference shared domain terms
   **When** the glossary section is written
   **Then** it defines Labor Dance, VAS, SOP, safety screening, pre-session safety check, emergency stop, companion, completed session, and incomplete session
   **And** definitions use language suitable for downstream product, UX, and engineering work.

3. **Core user journeys are documented**
   **Given** DiaMom has multiple user contexts
   **When** user journeys are added
   **Then** the document includes first-time mother onboarding, returning mother quick session, high-risk safety stop, and midwife-assisted education
   **And** each journey names actor, trigger, steps, success outcome, and safety/privacy notes.

4. **Privacy and safety guardrails are captured for later stories**
   **Given** DiaMom handles sensitive pregnancy and pain-related data
   **When** guardrails are documented
   **Then** local-only MVP data handling, no health-data analytics, no cloud sync, and no sensitive crash/log output are stated
   **And** backend, clinician-facing, AI, or personalized recommendation features are marked as requiring separate review before build.

5. **Traceability hooks exist**
   **Given** this document will guide later story creation
   **When** the foundation document is complete
   **Then** it references source requirements from the PRD and validation report
   **And** it gives future stories stable language for disclaimers, warnings, and result-summary anti-claim behavior.

## Tasks / Subtasks

- [x] Create the product foundation document (AC: 1, 2, 3, 4, 5)
  - [x] Add `docs/planning-artifacts/product-foundation.md`.
  - [x] Use clear Markdown headings: Product Boundary, Non-Goals, Glossary, User Journeys, Safety Guardrails, Privacy Guardrails, Traceability Notes.
  - [x] Keep all artifact content in English, matching current BMAD config, while preserving exact Bahasa Indonesia user-facing phrases where already specified by the PRD.

- [x] Define product boundary and non-goals (AC: 1)
  - [x] State DiaMom is an education/support companion only.
  - [x] List explicit non-goals: diagnosis, treatment, medical advice, emergency triage, clinical decision support, guaranteed easier labor, guaranteed pain reduction, and replacement for doctor/midwife care.
  - [x] Add a note that app-store, marketing, result, and onboarding copy must obey this boundary.

- [x] Build the glossary (AC: 2)
  - [x] Define Labor Dance, VAS, SOP, safety screening, pre-session safety check, emergency stop, companion, completed session, and incomplete session.
  - [x] Keep glossary terms consistent with `docs/PRD.md` and `docs/ARCHITECTURE.md`.
  - [x] Avoid introducing new product terms that are not needed by the PRD or architecture.

- [x] Document user journeys (AC: 3)
  - [x] Journey 1: first-time mother onboarding.
  - [x] Journey 2: returning mother quick session.
  - [x] Journey 3: high-risk safety stop.
  - [x] Journey 4: midwife-assisted education.
  - [x] For each journey include actor, trigger, main steps, success outcome, and safety/privacy notes.

- [x] Capture safety and privacy guardrails (AC: 4, 5)
  - [x] Include local-only MVP storage and no backend/cloud sync.
  - [x] State that pregnancy week, due date, VAS score, activity history, emergency contact, and notes are sensitive.
  - [x] State that sensitive values must not appear in analytics events, console logs, crash reports, or remote debugging.
  - [x] State that result-summary language must describe self-reported comfort tracking, not medical effectiveness.

- [x] Add traceability references (AC: 5)
  - [x] Cite PRD sections for product positioning, safety boundary, success metrics, content governance, and PM concerns.
  - [x] Cite validation report findings for regulatory/product boundary, privacy scope, user journeys, and glossary gaps.
  - [x] Cite architecture sections for local-first storage, sensitive data handling, and future backend constraints.

## Dev Notes

This is a planning/documentation story, not app implementation. Do not scaffold the React Native app in this story. That starts in Story 1.2.

### Source Requirements

- `docs/PRD.md` defines DiaMom as a pregnancy support and education companion, not a replacement for doctor/midwife care. It also lists prohibited positioning: no guarantees of easier labor, no medical pain-reduction claim, no diagnosis, and no replacement of care.
- `docs/PRD.md` requires a medical disclaimer across onboarding, activity screens, and settings. Users must confirm the disclaimer, complete safety screening, complete pre-session safety checks, and have access to emergency stop.
- `docs/PRD.md` states success metrics must be treated as self-reported comfort metrics, not medical proof.
- `docs/PRD.md` requires content governance: draft, medical/midwife review, approval before release, versioning, local MVP storage, and future CMS migration.
- `docs/planning-artifacts/prds/prd-diamom-validation-2026-05-21/validation-report.md` graded the PRD as Fair because safety policy, privacy obligations, regulatory boundaries, user journeys, and glossary were under-specified.
- `docs/ARCHITECTURE.md` defines the MVP as offline-first/local-first, with no backend account, no cloud sync, no health data analytics, and sensitive data excluded from logs, analytics, crash reports, and remote debugging.

### Architecture Compliance

- Output location: `docs/planning-artifacts/product-foundation.md`.
- Do not create source app files in this story.
- Do not create database schema in this story.
- Do not introduce backend, authentication, cloud sync, provider dashboard, AI, or CMS implementation work.
- Future stories must be able to cite this artifact for shared terminology, privacy boundaries, and claim-safe copy.

### Product Boundary Language To Preserve

Use these constraints exactly in substance:

- DiaMom is not a replacement for medical advice, diagnosis, or treatment.
- Always follow recommendations from doctor, midwife, or healthcare provider.
- Stop activity immediately if the user feels unsafe or uncomfortable.
- DiaMom must not claim to medically reduce pain or guarantee easier labor.
- VAS trends are self-reported comfort tracking, not medical proof.

### Privacy Guardrails

Sensitive data categories:

- Mother name
- Pregnancy week
- Estimated due date
- VAS score
- Activity history
- Emergency contact
- Session notes

Required MVP stance:

- Local-only storage.
- No backend account.
- No cloud sync.
- No health-data analytics.
- Delete-local-data requirement preserved for later settings stories.

### Testing / Validation

This story is validated by document review rather than automated tests.

Checklist:

- Product foundation document exists at `docs/planning-artifacts/product-foundation.md`.
- Every glossary term from AC2 is present.
- All four user journeys from AC3 are present.
- Non-goals include diagnosis, treatment, medical advice, emergency triage, clinical decision support, guaranteed pain reduction, and replacement for doctor/midwife care.
- Privacy section explicitly blocks sensitive values from analytics/logging/crash reports.
- Sources are cited with local file paths.

### Project Structure Notes

- Current project is documentation-first. There is no React Native app code yet.
- This story intentionally creates a planning artifact before app scaffold work so later stories do not invent inconsistent health/safety language.
- No existing implementation files are modified by this story.

### References

- [PRD.md](/Users/achmad/Development/react-native/diamom-project/docs/PRD.md)
- [ARCHITECTURE.md](/Users/achmad/Development/react-native/diamom-project/docs/ARCHITECTURE.md)
- [validation-report.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/prds/prd-diamom-validation-2026-05-21/validation-report.md)
- [epics.md](/Users/achmad/Development/react-native/diamom-project/docs/planning-artifacts/epics.md)

## Open Questions

- Who will be the named clinical reviewer for the initial safety/disclaimer content?
- Should `product-foundation.md` stay in English as a planning artifact while user-facing snippets are Bahasa Indonesia, or should the whole artifact be bilingual?

## Dev Agent Record

### Agent Model Used

GPT-5

### Debug Log References

- `rg '^## (Product Boundary|Non-Goals|Glossary|User Journeys|Safety Guardrails|Privacy Guardrails|Traceability Notes)' docs/planning-artifacts/product-foundation.md`
- `rg 'Labor Dance|VAS|SOP|Safety Screening|Pre-Session Safety Check|Emergency Stop|Companion|Completed Session|Incomplete Session' docs/planning-artifacts/product-foundation.md`
- `rg 'Journey 1: First-Time Mother Onboarding|Journey 2: Returning Mother Quick Session|Journey 3: High-Risk Safety Stop|Journey 4: Midwife-Assisted Education' docs/planning-artifacts/product-foundation.md`
- `rg 'diagnosis|treatment|medical advice|emergency triage|clinical decision support|guaranteed pain reduction|replacement for doctor' docs/planning-artifacts/product-foundation.md`
- `rg 'analytics|console logs|crash reports|remote debugging|cloud sync|backend account|local-only' docs/planning-artifacts/product-foundation.md`
- `ruby -e 'require "yaml"; YAML.load_file("docs/implementation-artifacts/sprint-status.yaml"); puts "valid yaml"'`

### Completion Notes List

- Created `docs/planning-artifacts/product-foundation.md` with the required product boundary, non-goals, glossary, four user journeys, safety guardrails, privacy guardrails, claim-safe result language, traceability notes, and source references.
- Preserved the story scope as documentation/planning only; no React Native app scaffold, source code, database schema, backend, cloud sync, AI, or CMS work was added.
- Validated required sections, glossary terms, journeys, non-goals, privacy/logging prohibitions, artifact existence, and sprint-status YAML syntax.

### File List

- docs/planning-artifacts/product-foundation.md
- docs/implementation-artifacts/1-1-define-product-boundary-glossary-and-user-journeys.md
- docs/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-05-21T10:29:38+07:00 - Implemented Story 1.1 product foundation artifact and moved story to review.
