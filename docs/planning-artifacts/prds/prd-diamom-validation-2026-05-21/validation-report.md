# Validation Report — DiaMom Mobile App

- **PRD:** `docs/PRD.md`
- **Rubric:** `.agents/skills/bmad-prd/assets/prd-validation-checklist.md`
- **Run at:** 2026-05-21T10:07:20+07:00
- **Grade:** Fair

## Overall verdict

The DiaMom PRD has a clear product thesis: a Bahasa Indonesia pregnancy support companion centered on education, breathing, Labor Dance guidance, VAS tracking, and safety-first session flow. It is strong as a product framing draft, but only fair as a build handoff because health/safety policy, MVP boundaries, privacy obligations, and measurable acceptance criteria remain too underspecified for downstream UX, architecture, and story generation.

The biggest risk is not missing screens; the document already lists many screens. The risk is that the PRD repeatedly says "safe", "proper privacy", "reviewed by a qualified healthcare professional", and "blocked or warned" without converting those phrases into explicit go/no-go rules, required copy, data handling constraints, and testable acceptance criteria.

## Dimension verdicts

- Decision-readiness — thin
- Substance over theater — adequate
- Strategic coherence — adequate
- Done-ness clarity — thin
- Scope honesty — thin
- Downstream usability — thin
- Shape fit — thin

## Findings by severity

### Critical (0)

No critical findings. The PRD is not unsafe in intent; it is under-specified for safe implementation.

### High (7)

**Decision-readiness** — Safety gating policy is ambiguous (§11 FR-003, lines 581-590)  
The PRD says users with risky answers can be "blocked or warned", which does not tell UX or engineering what to do for bleeding, severe dizziness, unusual severe pain, severe shortness of breath, bed rest, or provider prohibition.  
Fix: Add a safety decision table with each screening/checklist answer, severity, user-facing copy, allowed next actions, and whether education-only access remains available.

**Decision-readiness** — Exercise warning signs are incomplete against pregnancy exercise guidance (§8.2, lines 160-177; §8.10, lines 371-386)  
The checklist covers bleeding, dizziness, severe pain, and severe shortness of breath, but does not cover several common stop-exercise warning signs such as chest pain, headache, muscle weakness, calf pain/swelling, regular painful contractions, or leaking/gushing fluid.  
Fix: Align safety screening, pre-session checks, and movement warnings with a reviewed clinical warning-sign list; cite the source in the PRD and require medical review before release.

**Strategic coherence** — MVP is oversized without a slice strategy (§16, lines 1026-1055)  
The Must Have list is broad enough to create many parallel workstreams before the core safety loop is proven.  
Fix: Define an MVP vertical slice: one onboarding path, one approved breathing session, one approved Labor Dance session or defer Labor Dance to phase 2, one VAS before/after path, one history view, and one emergency stop path.

**Done-ness clarity** — Safety-critical FRs lack testable state machines (§11 FR-002/FR-003/FR-012, lines 560-590 and 740-759)  
Onboarding, safety screening, and emergency stop do not define exact states, transitions, blocked actions, persistence, or re-entry behavior.  
Fix: Add flow/state tables for onboarding completion, disclaimer consent, safety screening, pre-session safety check, emergency stop, interrupted sessions, and returning users.

**Scope honesty** — No explicit regulatory/product boundary for wellness vs medical-device behavior (§3, lines 30-41; §14, lines 972-998; §18, lines 1139-1148)  
The PRD says the app is not diagnosis/treatment, but does not define prohibited recommendations, app-store/marketing claim boundaries, or when future features like midwife dashboard/backend sync require legal/regulatory review.  
Fix: Add a Non-Goals and Regulatory Boundary section: no diagnosis, no treatment recommendation, no clinical decision support, no emergency triage, no claims of pain reduction, and review triggers for backend, clinician, AI, or personalized recommendation features.

**Scope honesty** — Privacy scope is under-specified for reproductive health data (§12 Privacy/Security, lines 868-879; §14 Analytics, lines 972-998)  
The PRD recognizes sensitivity but does not define consent surfaces, retention, analytics SDK restrictions, third-party sharing prohibition, privacy notice content, or whether HIPAA/other laws apply.  
Fix: Add a privacy requirements section with local-only MVP constraints, no third-party health-data analytics by default, deletion/retention rules, consent copy, crash-log redaction, and legal review before backend or provider-facing features.

**Shape fit** — The PRD is under-formalized for a pregnancy movement product (§6, §8, §11, §12, §19)  
Safety and privacy are acknowledged but not converted into release-blocking requirements.  
Fix: Add dedicated sections for Safety Policy, Privacy/Data Handling, Regulatory Boundary, Content Governance, and Open Questions before creating epics/stories.

### Medium (9)

**Decision-readiness** — Decision ownership is missing for clinical content approval (§19, lines 1152-1163)  
The PRD says content should be reviewed by a midwife or medical expert, but does not define approver role, approval record, version ownership, or release-blocking criteria.  
Fix: Add content governance acceptance criteria: approver identity/role captured, content versioned, release blocked when unapproved, and emergency/safety copy separately reviewed.

**Substance over theater** — Non-functional requirements are too generic for implementation (§12, lines 844-879)  
Performance, accessibility, privacy, and security are present, but they lack measurable thresholds and test methods.  
Fix: Add concrete bounds such as target launch time, tap target size, minimum contrast, screen reader coverage, local encryption expectations, analytics exclusions, crash-log redaction, and offline behavior per feature.

**Strategic coherence** — Success metrics do not fully validate the safety-first thesis (§18, lines 1115-1148)  
Metrics mostly measure completion and engagement. There are no counter-metrics for unsafe continuation, warning comprehension failures, emergency stop frequency, incomplete safety checks, or content approval coverage.  
Fix: Add safety and quality counter-metrics: risky-check abandonment, emergency-stop rate, high-VAS escalation rate, safety-copy comprehension, unapproved content count, and crash/session interruption recovery.

**Done-ness clarity** — VAS handling is underspecified (§11 FR-010/FR-013/FR-014, lines 709-793)  
The PRD defines score selection and comparison, but not category thresholds, high-score rules, skip behavior side effects, record completeness, or how to avoid implying treatment efficacy.  
Fix: Define VAS category thresholds, high-score escalation copy, incomplete-result storage, chart inclusion/exclusion rules, and exact wording constraints for result summaries.

**Done-ness clarity** — Data models are useful but not acceptance criteria (§13, lines 883-968)  
TypeScript-like models exist, but the PRD does not specify required/optional field validation, retention, deletion cascade, migrations, or local storage security.  
Fix: Add data acceptance criteria for each model: validation, lifecycle, delete behavior, export/back-up stance, and privacy classification.

**Scope honesty** — Language scope is mixed (§ header lines 5-8; §8 and §11 mixed Indonesian/English labels)  
The PRD says primary language is Bahasa Indonesia and English later, but many required pages and fields are in English.  
Fix: Add a localization rule: all MVP user-facing copy is Bahasa Indonesia, internal IDs may be English, English release is out of scope for MVP unless explicitly added.

**Downstream usability** — Missing traceability across screens, FRs, data, events, and metrics (§9-§18, lines 450-1148)  
Story generation will have to infer which FR owns each screen, data field, event, and success metric.  
Fix: Add a compact traceability table: Screen/Flow -> FR IDs -> data model -> analytics events -> acceptance tests.

**Downstream usability** — No user journeys with named personas (§5 and §10, lines 57-69 and 493-542)  
The PRD lists target users and flows, but not user journeys that bind a persona, context, goal, and success outcome.  
Fix: Add 3-4 user journeys: first-time mother onboarding, returning mother quick session, high-risk safety stop, and midwife-assisted education session.

**Shape fit** — Professional-use phase changes the product shape (§17 Phase 3, lines 1104-1111)  
Midwife review mode, admin CMS, PDF export, and backend sync imply new users, data sharing, consent, and possibly compliance obligations.  
Fix: Mark Phase 3 as out of MVP scope with separate discovery/PRD required before build.

### Low (2)

**Substance over theater** — UI direction is visual but not behavioral (§20, lines 1174-1219)  
The PRD defines colors, type sizes, and tabs, but not interaction tone for reassurance, errors, or safety escalation.  
Fix: Add UX principles for safety language, non-alarming warnings, and clear emergency affordances in Bahasa Indonesia.

**Downstream usability** — Glossary is absent (§ throughout)  
Domain terms are understandable but not defined consistently enough for source extraction.  
Fix: Add a glossary for Labor Dance, VAS, SOP, safety screening, pre-session safety check, emergency stop, companion, and completed/incomplete session.

## Mechanical notes

- FR IDs are contiguous from FR-001 to FR-017.
- The PRD has no Open Questions, `[ASSUMPTION]`, or `[NOTE FOR PM]` callouts.
- User-facing labels mix Bahasa Indonesia and English despite Bahasa Indonesia being the primary language.
- Several repeated concepts appear in multiple places with slightly different names: Safety Screening, Safety Check Before Session, Pre-session safety check, Emergency Stop Modal, Emergency Stop flow.
- No glossary or traceability table is present.
- External grounding used during validation: ACOG pregnancy exercise warning signs and hydration guidance; FDA mobile medical app/general wellness boundary; HHS/OCR mobile health app privacy guidance.

## Reviewer files

- `review-rubric.md`

## External references used

- ACOG: Exercise During Pregnancy — https://www.acog.org/womens-health/faqs/exercise-during-pregnancy
- ACOG: Physical Activity and Exercise During Pregnancy and the Postpartum Period — https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/04/physical-activity-and-exercise-during-pregnancy-and-the-postpartum-period
- FDA: Device Software Functions Including Mobile Medical Applications — https://www.fda.gov/medical-devices/digital-health-center-excellence/device-software-functions-including-mobile-medical-applications
- FDA: Examples of Software Functions That Are NOT Medical Devices — https://www.fda.gov/medical-devices/device-software-functions-including-mobile-medical-applications/examples-software-functions-are-not-medical-devices
- HHS/OCR: Resources for Mobile Health Apps Developers — https://www.hhs.gov/hipaa/for-professionals/special-topics/health-apps/index.html
- HHS/OCR: Protecting the Privacy and Security of Your Health Information When Using Your Personal Cell Phone or Tablet — https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/cell-phone-hipaa/index.html
