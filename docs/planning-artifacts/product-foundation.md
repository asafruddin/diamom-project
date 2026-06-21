# DiaMom Product Foundation

## Purpose

This artifact defines the product boundary, glossary, user journeys, and safety/privacy guardrails that future DiaMom stories must follow.

DiaMom is a pregnancy support and education companion for labor preparation, breathing guidance, Labor Dance education, guided movement practice, and self-reported VAS tracking. It is not a medical product, emergency service, diagnostic tool, treatment recommendation system, or replacement for care from a doctor, midwife, or other qualified healthcare provider.

## Product Boundary

DiaMom may:

- Provide educational materials about Labor Dance, breathing, preparation, and self-monitoring.
- Guide safe, gentle practice flows only after required consent and safety checks.
- Record self-reported pain/comfort scores using VAS.
- Help users view history and progress as self-monitoring information.
- Support a separate researcher-only login flow inside the app for approved research users.
- Sync explicitly consented participant research data to a Neon backend for aggregated dashboard reporting.
- Remind users to practice, hydrate, relax, or review materials.
- Encourage users to follow doctor, midwife, or healthcare provider guidance.

DiaMom must not:

- Diagnose pregnancy conditions.
- Provide medical advice, diagnosis, treatment, or clinical decision support.
- Perform emergency triage.
- Claim that Labor Dance, breathing, or the app medically reduces pain.
- Guarantee easier labor, faster labor, safer labor, or a specific health outcome.
- Replace doctor, midwife, hospital, or emergency care.
- Tell users to continue activity when they feel unsafe, uncomfortable, or have warning signs.

Required product-boundary language, in substance:

> DiaMom is not a replacement for medical advice, diagnosis, or treatment. Always follow recommendations from your doctor, midwife, or healthcare provider. Stop the activity immediately if you feel unsafe or uncomfortable.

## Non-Goals

The MVP explicitly excludes:

- Participant account creation.
- Midwife dashboard or clinician-facing dashboard.
- Admin CMS.
- PDF export.
- AI voice recap or personalized AI recommendation.
- Wearable integration.
- English release.
- iOS production release.
- Diagnosis, treatment, emergency triage, clinical decision support, or medical-device behavior.

The approved scope today includes backend-backed participant storage, anonymous participant sessions, and the researcher dashboard flow. Any additional provider-facing, AI, personalized recommendation, CMS, or broader data-sharing features still require separate discovery, privacy/legal review, and PRD update before implementation.

## Glossary

| Term | Definition |
|---|---|
| Labor Dance | Gentle labor-preparation movement guidance presented by DiaMom as education and support, not medical treatment. |
| VAS | Visual Analog Scale pain/comfort self-report from 0 to 10. In DiaMom, VAS is for self-monitoring only and is not medical proof of treatment effect. |
| SOP | Standard Operating Procedure content explaining preparation, explanation, activity, evaluation, and documentation steps for Labor Dance education. |
| Safety Screening | First-use checklist that identifies whether the user has risk conditions that should block or warn before guided activity. |
| Pre-Session Safety Check | Quick condition check completed before every guided session to confirm the user is safe enough to proceed at that moment. |
| Emergency Stop | Immediate session-ending action for discomfort, warning signs, or user concern. It stops activity and shows rest/contact guidance without diagnosis. |
| Companion | A support person such as husband, partner, family member, doula, midwife, nurse, or other birth companion who may assist during practice. |
| Research Consent | Explicit participant approval that allows selected research data to sync from the app to the Neon backend. |
| Researcher Dashboard | An authenticated in-app dashboard for approved researchers showing aggregated participant metrics only. |
| Completed Session | A guided breathing or Labor Dance session that reaches completion and has required session data saved. |
| Incomplete Session | A session that is stopped, interrupted, emergency-stopped, or missing required VAS information. Incomplete sessions must be labeled clearly and handled safely in history/progress logic. |

## User Journeys

### Journey 1: First-Time Mother Onboarding

**Actor:** Pregnant mother, especially in third trimester.

**Trigger:** Opens DiaMom for the first time and taps `Mulai`.

**Main Steps:**

1. Sees DiaMom identity and support/education positioning.
2. Reads onboarding introduction.
3. Enters mother profile and pregnancy information.
4. Confirms doctor/midwife approval.
5. Completes first-use safety screening.
6. Reviews and accepts medical disclaimer.
7. Reaches home dashboard if all required gates pass.

**Success Outcome:** The user reaches DiaMom home with profile, consent, and safety baseline stored in the DiaMom database.

**Safety Notes:** Guided activity remains locked until consent and safety requirements are complete. Provider guidance overrides app guidance.

**Privacy Notes:** Profile and session data are stored through the anonymous participant backend session. Research dashboard reporting still requires explicit participant research consent.

### Journey 2: Returning Mother Quick Session

**Actor:** Returning pregnant mother who has completed onboarding and safety screening.

**Trigger:** Opens DiaMom and wants to practice.

**Main Steps:**

1. Lands on `Beranda`.
2. Taps the start-session CTA.
3. Completes pre-session safety check.
4. Records VAS before score.
5. Chooses session duration.
6. Reviews preparation guidance.
7. Starts guided activity.
8. Records or intentionally skips VAS after.
9. Reviews result summary and saves history.

**Success Outcome:** The user completes or safely exits a guided session and has an accurate database-backed record.

**Safety Notes:** Pre-session check, VAS before, pause, stop, and emergency stop cannot be bypassed.

**Privacy Notes:** VAS and session history are stored in the DiaMom backend. Only consented participant records may appear in researcher dashboard aggregates. Analytics may track flow events only, never score values.

### Journey 3: High-Risk Safety Stop

**Actor:** Pregnant mother who reports a risky condition or feels uncomfortable.

**Trigger:** Selects a risky safety-screening answer, reports a warning sign, selects high VAS 9-10, or taps emergency stop.

**Main Steps:**

1. App immediately applies the safety gating policy.
2. Guided activity is blocked or stopped according to the risk condition.
3. User sees calm Bahasa Indonesia guidance to stop, rest, hydrate, and contact a companion, doctor, or midwife if symptoms continue.
4. Emergency contact action is shown when available.
5. Educational materials remain available only where the safety policy allows.

**Success Outcome:** The user is not pushed into continuing activity and receives clear next-step guidance without diagnosis.

**Safety Notes:** The app must not decide medical urgency or triage. It must direct the user toward qualified support when warning signs appear.

**Privacy Notes:** Emergency-stop and high-risk flows must not log sensitive symptoms, VAS values, contact names, or phone numbers.

### Journey 4: Midwife-Assisted Education

**Actor:** Midwife, nurse, doula, maternity educator, or mother with a companion.

**Trigger:** Uses DiaMom as structured education during preparation or counseling.

**Main Steps:**

1. Opens educational materials.
2. Reviews Labor Dance explanation and SOP.
3. Opens breathing or movement details.
4. Uses warnings, preparation, equipment, and companion notes to discuss safe practice.
5. Starts practice only if the mother has completed required consent and safety gates.

**Success Outcome:** DiaMom supports structured education without replacing professional judgment.

**Safety Notes:** Professional guidance always overrides app content. The app must not represent itself as clinical protocol.

**Privacy Notes:** Midwife/provider dashboards, exports, and non-research backend sync remain out of scope and require separate review.

### Journey 5: Research Consent and Dashboard Review

**Actor:** Participant and approved researcher.

**Trigger:** A participant enables research sync, or a researcher signs into the in-app dashboard.

**Main Steps:**

1. Participant reviews the research consent screen.
2. App marks the participant record as research-consented and assigns a study ID in the backend.
3. Completed VAS sessions are already stored in Neon and become eligible for researcher aggregation after consent.
4. Researcher signs in with a separate login flow.
5. Researcher views aggregated counts and averages only.

**Success Outcome:** The participant controls whether research data is synced, and the researcher sees only the approved aggregate dashboard metrics.

**Privacy Notes:** Research dashboard inclusion must use explicit consent, encrypted transport, anonymous participant sessions separated from researcher auth, and no sensitive logging.

## Safety Guardrails

The safety flow for guided activity must preserve this order:

```text
Medical Disclaimer
-> Safety Screening
-> Pre-Session Safety Check
-> VAS Before
-> Session Preparation
-> Guided Activity
-> Emergency Stop available throughout
-> VAS After
-> Result Summary
```

Core safety principles:

- Users must confirm the disclaimer before activity access.
- Users must complete first-use safety screening before activity access.
- Users must complete a pre-session safety check before every guided activity session.
- Emergency stop must immediately end the session.
- Users must never be forced to continue activity.
- High VAS 9-10 must show safety guidance.
- Content must include clear warning signs and stop guidance.
- All maternity-related safety content must be reviewed before release.

Warning signs that must be represented in safety content after clinical review:

- Bleeding.
- Dizziness or faintness.
- Severe or unusual pain.
- Severe shortness of breath.
- Chest pain.
- Headache.
- Muscle weakness.
- Calf pain or swelling.
- Regular painful contractions.
- Leaking or gushing fluid.
- Feeling unsafe or uncomfortable.

## Privacy Guardrails

Sensitive MVP data includes:

- Mother name.
- Pregnancy week.
- Estimated due date.
- First pregnancy status.
- Doctor/midwife approval confirmation.
- Emergency contact names and phone numbers.
- VAS scores.
- Activity session history.
- Session notes.
- Safety screening answers.
- Pre-session safety check answers.

MVP data stance:

- Store sensitive records in the approved DiaMom backend and keep them out of analytics, logs, and crash reports.
- No participant backend account.
- No non-consented cloud sync.
- No health-data analytics.
- No third-party sharing of health or contact details.
- Allow users to delete local data in a later settings story.

Implementation guardrails for future stories:

- Do not log sensitive values to console.
- Do not send sensitive values to analytics.
- Do not include sensitive values in crash reports.
- Do not expose sensitive values in remote debugging output.
- Product events may track behavior names only, such as `onboarding_started`, `session_started`, or `emergency_stop_clicked`.
- The approved researcher dashboard flow must use consent-based sync, encrypted transport, data minimization, export/delete planning, privacy policy updates, and separate legal/privacy review.

## Claim-Safe Result Language

Result summaries and progress charts may say:

- "VAS sebelum" and "VAS sesudah".
- "Perubahan skor berdasarkan input Anda."
- "Catatan ini membantu Anda memantau kenyamanan secara mandiri."

Result summaries and progress charts must not say:

- "Nyeri berhasil dikurangi secara medis."
- "Latihan ini menyembuhkan nyeri."
- "DiaMom membuktikan persalinan akan lebih mudah."
- "Anda aman untuk melanjutkan aktivitas" when warning signs are present.

Use this concept in English planning language:

> VAS trends are self-reported comfort tracking, not medical proof.

## Traceability Notes

| Foundation Area | Source Requirements | Future Story Impact |
|---|---|---|
| Product boundary | `docs/PRD.md` sections 1, 3, 6, 18, 21; validation report high finding on regulatory/product boundary | Onboarding, disclaimer, result summary, marketing/app copy, safety messages |
| Glossary | Validation report downstream usability finding: glossary absent | All stories that reference Labor Dance, VAS, SOP, safety screening, session state, history |
| User journeys | Validation report downstream usability finding: missing named user journeys | UX, navigation, onboarding, session, history, profile, education flows |
| Safety guardrails | `docs/PRD.md` sections 6, 8.2, 8.8, 8.10, 10, 15, 21; validation safety-gating findings | Onboarding, safety screening, pre-session check, VAS, emergency stop, movement detail |
| Privacy guardrails | `docs/PRD.md` sections 12, 14; `docs/ARCHITECTURE.md` privacy/security architecture; validation privacy finding | Storage, analytics, crash reporting, settings, delete local data, future backend |
| Content governance | `docs/PRD.md` section 19; validation content approval finding | Local JSON content, disclaimer copy, safety copy, movement content, later CMS |

## Source References

- `docs/PRD.md`: Executive Summary, Product Positioning, Medical and Safety Boundary, Required Additions, Final User Flow, Feature Requirements, Non-Functional Requirements, Analytics Events, Edge Cases, Success Metrics, Content Governance, Biggest PM Concern.
- `docs/ARCHITECTURE.md`: Technology Baseline, Recommended Folder Structure, Navigation Architecture, Local Database Design, Session Engine, VAS Module, Privacy and Security Architecture, Testing Strategy, Future Backend Architecture, Recommended First Build Target.
- `docs/planning-artifacts/prds/prd-diamom-validation-2026-05-21/validation-report.md`: findings on safety gating, warning signs, regulatory/product boundary, privacy scope, user journeys, glossary, and traceability.
- `docs/planning-artifacts/epics.md`: Epic 1 and Story 1.1 acceptance criteria.
