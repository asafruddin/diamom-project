---
stepsCompleted:
  - step-01-requirements-extracted
  - step-02-epics-designed
  - step-03-stories-generated
inputDocuments:
  - docs/PRD.md
  - docs/ARCHITECTURE.md
  - docs/planning-artifacts/prds/prd-diamom-validation-2026-05-21/validation-report.md
  - docs/planning-artifacts/prds/prd-diamom-validation-2026-05-21/review-rubric.md
---

# DiaMom Mobile App - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for DiaMom Mobile App, decomposing the requirements from the PRD, validation report, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Show a branded DiaMom splash/welcome screen with a `Mulai` CTA; route first-time users to onboarding and returning users to home.

FR2: Show an onboarding introduction on first launch. No user profile, login, or registration is required. The app is fully anonymous — no name, pregnancy week, due date, doctor approval, or emergency contact is collected or stored.

FR3: Require safety screening completion and disclaimer consent before users can access activity features.

FR4: Provide first-use safety screening for activity risk factors.

FR5: Show warning or blocking guidance when a user reports a risky safety condition; educational content may remain accessible.

FR6: Provide a home dashboard with greeting, today's progress, start-session CTA, materials shortcut, VAS shortcut, history shortcut, and profile access.

FR7: Allow users to start a session from home in three taps or fewer.

FR8: Provide structured learning materials for Labor Dance explanation, SOP Labor Dance, breathing movements, Labor Dance movements, and closing/motivation content.

FR9: Allow users to browse, open, and navigate previous/next educational material details.

FR10: Display SOP Labor Dance in short readable cards with preparation, explanation, activity, evaluation, documentation, and safety reminders.

FR11: Provide breathing exercises for Napas Dalam, Napas Panjang, Napas Pendek, and Napas Relaksasi.

FR12: Allow users to start, pause, resume, and safely stop breathing exercises.

FR13: Support voice guidance for breathing exercises when enabled.

FR14: Display Labor Dance movement list cards with name, illustration, difficulty, required equipment, and companion requirement.

FR15: Allow users to open movement details grouped by difficulty when useful.

FR16: Provide movement detail pages with preparation, steps, benefits, safety notes, when-to-stop guidance, companion requirement, required equipment, and start-practice action.

FR17: Require users to submit a VAS before score from 0 to 10 before a guided session can continue.

FR18: Display selected VAS score clearly and store it temporarily in session state.

FR19: Allow users to choose session duration from 5, 10, 20, or 30 minutes.

FR20: Show selected session details including duration, difficulty, movement sequence, equipment, and companion need.

FR21: Provide a session preparation screen with clothing, floor safety, hydration, birth ball, and companion readiness guidance.

FR22: Provide a guided activity timer with current movement, instructions, illustration/animation, voice guide toggle, background music toggle, pause, stop, and emergency stop.

FR23: Support timer start, pause, resume, stop, and completion behavior.

FR24: Provide pause, stop confirmation, and emergency stop modals.

FR25: Emergency stop must immediately end the session and show safety guidance.

FR26: Allow users to contact an emergency contact from activity and emergency stop screens.

FR27: Require users to submit VAS after score from 0 to 10 before result summary, unless they skip with confirmation and the result is marked incomplete.

FR28: Provide result summary comparing before score, after score, difference, pain category change, duration, session type, and date/time.

FR29: Avoid medical-effectiveness claims in result summary and all product copy.

FR30: Save activity records locally, including date, activity type, duration, VAS before, VAS after, and optional note.

FR31: Provide activity history list, activity detail, delete-record behavior, no-history empty state, and offline availability.

FR32: Provide VAS progress chart with weekly/monthly filtering, before/after trends, average before score, average after score, total completed sessions, and best improvement.

FR33: Provide app settings, language settings, voice guide settings, notification settings, privacy/data page, privacy policy, terms/disclaimer, and delete local data. No personal profile or emergency contact fields are collected or managed.

FR34: Provide voice guide settings for voice on/off, background music on/off, volume, and instruction speed.

FR35: Provide reminder settings for daily reminders, selected time, selected days, and hydration/relaxation reminders.

FR36: Handle empty/error states for no history, no internet connection, failed result save, audio load failure, incomplete VAS assessment, and interrupted session.

FR37: Save interrupted session drafts locally and allow users to resume or discard with confirmation.

FR38: Show safety warning for high VAS score 9-10 and never force users to continue activity.

FR39: Provide content governance for educational, breathing, movement, safety, and disclaimer content: draft, expert review, approval, versioning, local storage for MVP, and later CMS migration.

FR40: Track product behavior events only, including onboarding, safety, material, session, VAS, result, history, profile, and notification events.

FR41: Implement safety gating policy refinements from validation: exact hard-block vs warning behavior, allowed next actions, user-facing copy, and education-only access per risk condition.

FR42: Implement complete pregnancy exercise warning signs after clinical review, including bleeding, dizziness/faintness, severe or unusual pain, severe shortness of breath, chest pain, headache, muscle weakness, calf pain/swelling, regular painful contractions, and leaking/gushing fluid.

FR43: Add explicit regulatory/product boundaries: no diagnosis, no treatment recommendation, no clinical decision support, no emergency triage, no guaranteed pain reduction, and review triggers for backend, clinician, AI, or personalized recommendation features.

FR44: Add explicit privacy requirements for local-only MVP, consent, retention, deletion, analytics SDK restrictions, third-party sharing prohibition, privacy notice content, crash-log redaction, and legal review before backend/provider-facing features.

FR45: Provide traceability between screens, FRs, data models, analytics events, and acceptance tests.

FR46: Add user journeys for first-time mother onboarding, returning mother quick session, high-risk safety stop, and midwife-assisted education.

FR47: Add a glossary for Labor Dance, VAS, SOP, safety screening, pre-session safety check, emergency stop, companion, completed session, and incomplete session.

### NonFunctional Requirements

NFR1: The app must be implemented with React Native and Expo SDK 55, React Native 0.83.x, React 19.2.x, Node.js 20.19.x or newer, and React Native New Architecture.

NFR2: The app must use a development build for native module testing and production-like validation.

NFR3: The MVP must be Android-first, Bahasa Indonesia-only, offline-first, local-storage-only, and backend-free.

NFR4: Initial app load should be fast on mid-range Android devices; final stories should define measurable launch/render thresholds before release.

NFR5: Main screens should render smoothly and audio/animation must not block user interaction.

NFR6: Learning materials, movement instructions, VAS records, activity history, and MVP content must work offline.

NFR7: Audio files may be bundled for MVP or downloaded/cached in a later release.

NFR8: UI must use large touch targets, clear text contrast, readable instruction text, screen reader labels, reduced-motion support, and simple non-judgmental language.

NFR9: Pregnancy profile, due date, VAS scores, activity history, emergency contacts, and related settings must be treated as sensitive data.

NFR10: MVP data must be stored locally, with no backend account, no cloud sync, and no health-data analytics.

NFR11: Users must be able to delete local data.

NFR12: Sensitive health data must not be logged to console logs, analytics events, crash reports, or remote debugging sessions.

NFR13: If backend is added later, it must use authentication, encrypted transport, consent-based sync, minimal health data, export/delete options, and privacy/terms review.

NFR14: Product analytics must track flow behavior only and must not include personally identifiable health details without explicit consent and privacy review.

NFR15: Safety, educational, Labor Dance, breathing, and disclaimer content must be reviewed by a qualified healthcare professional before release.

NFR16: Phase 3 professional-use features require separate discovery and PRD review before build because they change consent, sharing, compliance, and user roles.

NFR17: User-facing MVP copy must be Bahasa Indonesia; English release is out of scope unless explicitly reintroduced.

NFR18: App must pass Expo Doctor, typecheck, lint, tests, and Android internal/preview build validation before release.

### Additional Requirements

- Use Expo Router file-based routing with route groups for onboarding, tabs, materials, breathing, movements, session, history, settings, and modals.
- Use Expo SDK 55 template at the app root: `pnpm create expo-app . --template default@sdk-55`.
- Use `pnpm expo install` for Expo-managed packages and avoid manually guessing Expo package versions.
- Install and configure Expo packages for audio, blur, constants, device, file system, font, haptics, image, linear gradient, linking, localization, notifications, secure store, splash screen, SQLite, status bar, system UI, and web browser as needed.
- Use NativeWind/Tailwind, class-variance-authority, clsx, tailwind-merge, lucide-react-native, and optional SVG tooling for UI implementation.
- Use Zustand for app, user, and session state; use SQLite for long-term records.
- Use react-hook-form, Zod, and resolvers for onboarding, profile, settings, and validation flows.
- Use expo-sqlite with typed repository helpers and Drizzle ORM/Drizzle Kit where appropriate.
- Use local JSON content files for MVP: `materials.id.json`, `movements.id.json`, `breathing.id.json`, and `disclaimers.id.json`.
- Use feature-first architecture with layers: UI Screen -> Feature Component -> Hook -> Service -> Repository -> SQLite/SecureStore/Local JSON.
- Implement protected entry routing: incomplete onboarding or disclaimer redirects to onboarding; incomplete safety screening redirects to safety screening before activity.
- Implement session stages: idle, safety_check, vas_before, preparation, running, paused, stopped, emergency_stopped, vas_after, completed, saved.
- Implement session rules: pre-session safety required, VAS before required, VAS after skippable only with confirmation, emergency stop immediate, interrupted sessions saved as incomplete.
- Implement VAS category mapping: 0 none, 1-3 mild, 4-6 moderate, 7-10 severe.
- Use expo-notifications for reminder settings and scheduled reminders.
- Use expo-audio for voice guidance, breathing instructions, background music, and movement instructions; audio pauses/stops with session state and handles load failures gracefully.
- Use expo-linking to open phone dialer for emergency contact actions.
- Implement theme tokens and components: AppScreen, AppHeader, AppCard, AppButton, AppIconButton, AppModal, SafetyAlert, VasSlider, TimerDisplay, MovementCard, MaterialCard, HistoryCard, EmptyState, and ErrorState.
- Configure `app.config.ts`, EAS build profiles, and scripts for start, android, ios, web, doctor, lint, format, test, and typecheck.
- Add unit tests for VAS mapping, session state transitions, safety risk logic, form validation schemas, and repository functions.
- Add component tests for VAS slider, safety checklist, session timer controls, result summary, and history card.
- Add manual QA coverage for first launch, returning user, interrupted session, emergency stop, missing emergency contact, no history, audio failure, notification permission denied, and high VAS warning.

### UX Design Requirements

No standalone UX Design document was found. UX requirements embedded in the PRD and Architecture are captured as FRs, NFRs, and additional requirements above.

### FR Coverage Map

FR1: Epic 1 - trustworthy first launch and app entry.
FR2: Epic 2 - onboarding and pregnancy profile.
FR3: Epic 2 - onboarding validation and disclaimer consent gate.
FR4: Epic 2 - first-use safety screening.
FR5: Epic 2 - risky-condition warning/blocking behavior.
FR6: Epic 3 - home dashboard.
FR7: Epic 3 - quick start from home.
FR8: Epic 4 - structured learning material library.
FR9: Epic 4 - material detail navigation.
FR10: Epic 4 - SOP Labor Dance education.
FR11: Epic 4 - breathing exercise catalog.
FR12: Epic 5 - breathing exercise controls inside guided practice.
FR13: Epic 8 - voice guidance behavior and preference.
FR14: Epic 4 - Labor Dance movement list.
FR15: Epic 4 - movement detail access and grouping.
FR16: Epic 4 - movement detail safety and preparation content.
FR17: Epic 5 - VAS before gate.
FR18: Epic 5 - VAS before display and session state.
FR19: Epic 5 - session duration selection.
FR20: Epic 5 - selected session details.
FR21: Epic 5 - session preparation.
FR22: Epic 5 - guided activity timer surface.
FR23: Epic 5 - timer state behavior.
FR24: Epic 5 - pause/stop/emergency modals.
FR25: Epic 5 - emergency stop termination and guidance.
FR26: Epic 5 - emergency contact access during activity.
FR27: Epic 5 - VAS after gate and incomplete result behavior.
FR28: Epic 6 - result summary.
FR29: Epic 1 - anti-overclaiming product boundary applied across copy.
FR30: Epic 6 - local activity record persistence.
FR31: Epic 6 - history list, detail, delete, empty state, offline behavior.
FR32: Epic 6 - VAS progress chart.
FR33: Epic 7 - profile, settings, privacy, terms, language, data deletion.
FR34: Epic 8 - voice guide settings.
FR35: Epic 8 - reminder settings.
FR36: Epic 9 - empty/error states and resilience behaviors.
FR37: Epic 9 - interrupted session draft handling.
FR38: Epic 5 - high VAS safety warning and voluntary continuation rules.
FR39: Epic 1 - content governance policy and approved-content release gate.
FR40: Epic 9 - privacy-safe product behavior events.
FR41: Epic 2 - refined safety gating decision policy.
FR42: Epic 2 - complete pregnancy exercise warning signs.
FR43: Epic 1 - wellness/regulatory/product boundary.
FR44: Epic 1 - privacy/data handling policy for reproductive health data.
FR45: Epic 1 - traceability requirement for downstream build.
FR46: Epic 1 - user journeys requirement for downstream build.
FR47: Epic 1 - glossary requirement for downstream build.

## Epic List

### Epic 1: Trustworthy Product Boundary and Launch Foundation

Users and the product team get a safe, clear, Bahasa Indonesia DiaMom foundation: app identity, non-medical positioning, privacy/data boundaries, clinical content governance, glossary, user journeys, and traceability rules are established before implementation spreads across the app.

**FRs covered:** FR1, FR29, FR39, FR43, FR44, FR45, FR46, FR47

**User value:** A mother can open DiaMom and immediately understand that it is a support and education companion, not a replacement for doctor/midwife care. The team can build every later screen against consistent safety, privacy, content, and language rules.

**Natural dependencies:** This epic should come first because later onboarding, content, sessions, results, history, and settings all depend on the same product boundary, glossary, privacy stance, and approved copy rules.

### Epic 2: Safe Onboarding, Consent, and Activity Eligibility

First-time users complete a safety screening and accept the disclaimer before any guided movement session is available. No user profile, login, or registration is required — the app is fully anonymous.

**FRs covered:** FR2, FR3, FR4, FR5, FR41, FR42

**User value:** A mother can open the app without any sign-up or profile input. She is guided through safety screening and disclaimer acceptance before activity access, and can still reach educational materials when activity is not appropriate.

**Natural dependencies:** Builds on Epic 1's safety/privacy boundary. Enables Epic 3 home routing and Epic 5 session access.

### Epic 3: Home Dashboard and Core Navigation

Returning users can land on a calm home dashboard, see progress context, and reach the core DiaMom areas quickly: start session, materials, VAS, history, and profile.

**FRs covered:** FR6, FR7

**User value:** A mother can quickly understand what to do next and start a session in three taps or fewer after she has completed onboarding and safety requirements.

**Natural dependencies:** Requires onboarding completion state from Epic 2. Enables discovery of Epics 4, 5, 6, and 7.

### Epic 4: Offline Learning Materials and Movement Education

Users can learn Labor Dance, SOP guidance, breathing exercises, and movement details through reviewed offline educational content with preparation, benefits, safety notes, warnings, equipment, and companion requirements.

**FRs covered:** FR8, FR9, FR10, FR11, FR14, FR15, FR16

**User value:** A mother or midwife can use DiaMom as a safe, structured education companion even before starting a guided session.

**Natural dependencies:** Uses Epic 1 content governance and glossary. Can stand alone after navigation exists because education remains available even when activity is blocked.

### Epic 5: Safety-Gated Guided Session Flow

Users can complete a full safety-gated guided practice loop: pre-session check, VAS before, session selection, preparation, guided timer, pause/stop/emergency handling, emergency contact access, VAS after, and high-VAS safety guidance.

**FRs covered:** FR12, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR38

**User value:** A mother can safely practice breathing or Labor Dance with clear controls, emergency escape paths, and no pressure to continue when she feels unsafe.

**Natural dependencies:** Requires safety eligibility from Epic 2, navigation from Epic 3, and content/session definitions from Epic 4.

### Epic 6: Results, Local History, and VAS Progress

Users can save session outcomes locally, review activity history, inspect session details, delete records, and view VAS trends without the app making medical effectiveness claims.

**FRs covered:** FR28, FR30, FR31, FR32

**User value:** A mother can return to DiaMom over time and self-monitor comfort/session history without cloud sync or medical claims.

**Natural dependencies:** Requires session output from Epic 5 and privacy/data rules from Epic 1.

### Epic 7: Profile, Emergency Contact, Privacy, and Data Controls

Users can manage their profile, pregnancy detail, emergency contact, language preference, privacy/terms access, and local data deletion from the profile/settings area.

**FRs covered:** FR33

**User value:** A mother stays in control of sensitive pregnancy, contact, and app preference data.

**Natural dependencies:** Builds on profile data from Epic 2 and local data policies from Epic 1.

### Epic 8: Supportive Engagement: Voice Guidance, Music, and Reminders

Users can configure voice guidance, background music, volume, instruction speed, and gentle practice/hydration reminders to make sessions easier to follow and return to.

**FRs covered:** FR13, FR34, FR35

**User value:** A mother can personalize support without needing to stare at the screen during breathing or movement practice.

**Natural dependencies:** Builds on guided session flow from Epic 5 and profile/settings surface from Epic 7.

### Epic 9: Resilience, Analytics Safety, QA, and Release Readiness

Users experience graceful empty/error states, recover interrupted sessions, and benefit from a tested Android MVP whose analytics and diagnostics avoid sensitive health data.

**FRs covered:** FR36, FR37, FR40

**User value:** DiaMom behaves predictably in real life: interruptions, audio failure, missing history, notification denial, and save failures do not strand or pressure the user.

**Natural dependencies:** Cross-cuts prior epics but delivers user-facing reliability and release confidence after the main flows exist.

## Epic 1: Trustworthy Product Boundary and Launch Foundation

Users and the product team get a safe, clear, Bahasa Indonesia DiaMom foundation: app identity, non-medical positioning, privacy/data boundaries, clinical content governance, glossary, user journeys, and traceability rules are established before implementation spreads across the app.

### Story 1.1: Define Product Boundary, Glossary, and User Journeys

As a product team,
I want the DiaMom product boundary, glossary, and core user journeys documented,
So that every later implementation story uses the same safety language and user-value frame.

**Acceptance Criteria:**

**Given** the existing PRD and validation report  
**When** the product foundation document is created  
**Then** it defines DiaMom as a support and education companion, not medical advice, diagnosis, treatment, emergency triage, or clinical decision support  
**And** it includes glossary entries for Labor Dance, VAS, SOP, safety screening, pre-session safety check, emergency stop, companion, completed session, and incomplete session  
**And** it includes journeys for first-time mother onboarding, returning mother quick session, high-risk safety stop, and midwife-assisted education.

### Story 1.2: Scaffold the Expo SDK 55 App Shell and DiaMom Entry

As a first-time or returning user,
I want to open DiaMom and see a branded first screen,
So that I understand I am in the right app and can start the correct flow.

**Acceptance Criteria:**

**Given** the app is installed on Android  
**When** the user opens DiaMom  
**Then** the app shows the DiaMom identity and a Bahasa Indonesia `Mulai` entry action  
**And** first-time users are routed toward onboarding  
**And** returning users with completed onboarding and consent are routed toward the home dashboard  
**And** the implementation uses Expo SDK 55, Expo Router, React Native New Architecture, and the architecture folder conventions.

### Story 1.3: Establish Claim-Safe Copy and Disclaimer Rules

As a pregnant mother,
I want DiaMom copy to be clear about what the app can and cannot do,
So that I do not mistake the app for medical care.

**Acceptance Criteria:**

**Given** any user-facing copy is shown in onboarding, learning, sessions, results, history, or settings  
**When** the copy references pregnancy, pain, Labor Dance, breathing, or results  
**Then** it avoids claims that the app guarantees easier labor, medically reduces pain, diagnoses conditions, recommends treatment, or replaces doctor/midwife care  
**And** disclaimer copy is available in Bahasa Indonesia and can be reused across screens  
**And** result language frames VAS changes as self-reported comfort tracking, not medical effectiveness.

### Story 1.4: Define Local-Only Privacy and Sensitive Data Rules

As a privacy-conscious user,
I want my pregnancy and pain data protected locally,
So that sensitive reproductive health information is not shared without my consent.

**Acceptance Criteria:**

**Given** the MVP stores profile, pregnancy, VAS, history, emergency contact, settings, or session data  
**When** data handling rules are implemented  
**Then** the MVP uses local storage only with no backend account, no cloud sync, and no health-data analytics  
**And** sensitive values are excluded from analytics, console logs, crash reports, and remote debugging output  
**And** privacy and deletion requirements are documented for implementation stories  
**And** backend, provider-facing, AI, or sync features are marked as requiring separate privacy/legal review before build.

### Story 1.5: Add Content Governance and Requirement Traceability

As a product team,
I want content approval and requirement traceability captured,
So that safety-critical content and downstream stories are auditable.

**Acceptance Criteria:**

**Given** educational, breathing, movement, disclaimer, or safety content exists  
**When** content metadata is defined  
**Then** each content item supports version, reviewer, review date, and approval status  
**And** unapproved safety or medical-adjacent content is not considered release-ready  
**And** a traceability map links screens, FRs, data models, analytics events, and acceptance tests  
**And** future CMS migration is noted as later-phase work, not an MVP dependency.

## Epic 2: Safe Onboarding, Consent, and Activity Eligibility

First-time users complete a safety screening and accept the disclaimer before any guided movement session is available. No user profile, login, or registration is required — the app is fully anonymous.

### Story 2.1: Onboarding Introduction

As a first-time mother,
I want a gentle onboarding intro,
So that I understand what DiaMom does before I start.

**Acceptance Criteria:**

**Given** a first-time user opens the app  
**When** the onboarding intro is shown  
**Then** the user sees a welcoming explanation of DiaMom's purpose  
**And** no personal data is collected  
**And** the user can proceed to safety screening and disclaimer  
**And** incomplete onboarding cannot unlock guided activity features.

### Story 2.2: Require Medical Disclaimer Consent Before Activity Access

_(Formerly Story 2.3 — Stories 2.2 pregnancy info/provider approval and 7.2 emergency contacts are removed because no profile data is collected.)_

As a user,
I want to review and accept DiaMom's medical disclaimer,
So that I understand the app's limits before using activity features.

**Given** the user reaches the consent screen  
**When** she reviews the disclaimer and confirms consent  
**Then** consent status is stored locally with timestamp  
**And** activity features remain locked until consent is accepted  
**And** learning materials can still be available according to safety policy  
**And** the terms/disclaimer screen can be revisited from settings later.

### Story 2.3: Implement First-Use Safety Screening

As a pregnant mother,
I want to complete a safety screening before activity use,
So that DiaMom can guide me away from movement when risk signs are present.

**Acceptance Criteria:**

**Given** the user has accepted the disclaimer  
**When** she answers the first-use safety screening  
**Then** the screening captures bleeding, severe dizziness/faintness, unusual severe pain, severe shortness of breath, bed rest recommendation, and provider prohibition of physical activity  
**And** the screening result is stored locally with completion timestamp  
**And** risky answers trigger the defined safety gating policy  
**And** the user can retake screening from settings.

### Story 2.4: Implement Safety Gating and Education-Only Access

As a user with a risky screening answer,
I want clear guidance on what I can still do in DiaMom,
So that I am not pushed into unsafe activity.

**Acceptance Criteria:**

**Given** a safety screening or pre-session check includes a risky condition  
**When** the user attempts to start guided activity  
**Then** the app applies a deterministic hard-block or warning based on the safety decision table  
**And** hard-blocked users cannot start guided sessions until conditions are cleared or screening is updated  
**And** educational materials remain accessible when allowed by the safety policy  
**And** the safety message recommends consulting a doctor or midwife without diagnosing the user.

### Story 2.5: Add Complete Pregnancy Exercise Warning Signs

As a pregnant mother,
I want warning signs to be complete and visible,
So that I know when to stop and seek help.

**Acceptance Criteria:**

**Given** safety guidance appears in onboarding, pre-session checks, movement details, or emergency screens  
**When** warning signs are displayed  
**Then** they include bleeding, dizziness/faintness, severe or unusual pain, severe shortness of breath, chest pain, headache, muscle weakness, calf pain/swelling, regular painful contractions, and leaking/gushing fluid  
**And** warning-sign copy is reviewed through the content governance process  
**And** warning-sign content is available in Bahasa Indonesia  
**And** warning signs are not hidden behind optional or decorative UI.

## Epic 3: Home Dashboard and Core Navigation

Returning users can land on a calm home dashboard, see progress context, and reach the core DiaMom areas quickly: start session, materials, VAS, history, and profile.

### Story 3.1: Build Protected Main Tab Navigation

As a returning user,
I want the app to open into clear main tabs after onboarding,
So that I can reach the right DiaMom area quickly.

**Acceptance Criteria:**

**Given** onboarding, disclaimer, and safety screening are complete  
**When** the user opens the app  
**Then** Expo Router directs her to the main tab area  
**And** the tabs are `Beranda`, `Materi`, `Latihan`, `VAS`, and `Profil`  
**And** users missing onboarding or consent are redirected to the correct prerequisite screen  
**And** users missing safety screening are redirected before guided activity access.

### Story 3.2: Build Home Dashboard With Progress and Shortcuts

As a returning user,
I want a calm dashboard with my next useful actions,
So that I can continue preparation without searching.

**Acceptance Criteria:**

**Given** the user lands on `Beranda`  
**When** the dashboard loads  
**Then** it shows greeting, today's progress, start-session CTA, materials shortcut, VAS shortcut, history shortcut, and profile access  
**And** empty progress states are supportive  
**And** no sensitive health values are sent to analytics  
**And** dashboard content works offline.

### Story 3.3: Add Quick Start With Eligibility Checks

As a returning user,
I want to start a session from home in three taps or fewer,
So that practice feels easy when I am ready.

**Acceptance Criteria:**

**Given** the user taps the home start-session CTA  
**When** all prerequisites are complete and no blocking safety condition exists  
**Then** she reaches the pre-session safety check in three taps or fewer from home  
**And** blocked or incomplete users are routed to the exact missing prerequisite  
**And** routing never bypasses disclaimer, safety screening, or pre-session safety check  
**And** the user can cancel and return home safely.

## Epic 4: Offline Learning Materials and Movement Education

Users can learn Labor Dance, SOP guidance, breathing exercises, and movement details through reviewed offline educational content with preparation, benefits, safety notes, warnings, equipment, and companion requirements.

### Story 4.1: Create Local Reviewed Content Structure

As a product team,
I want local JSON content with review metadata,
So that MVP materials work offline and remain auditable.

**Acceptance Criteria:**

**Given** the MVP content is stored locally  
**When** content files are added  
**Then** `materials.id.json`, `movements.id.json`, `breathing.id.json`, and `disclaimers.id.json` exist in the architecture-approved location  
**And** each content item includes id, title, description/body, version, review metadata, and approval status  
**And** unapproved content can be identified before release  
**And** content uses Bahasa Indonesia user-facing copy.

### Story 4.2: Build Material List and Detail Navigation

As a user,
I want to browse and read learning materials,
So that I can understand Labor Dance and preparation steps before practicing.

**Acceptance Criteria:**

**Given** reviewed local materials exist  
**When** the user opens `Materi`  
**Then** she can see a material list and open a material detail  
**And** detail pages support previous/next navigation  
**And** content is available offline  
**And** missing or unavailable content shows a clear error state.

### Story 4.3: Build SOP Labor Dance Cards

As a user or midwife,
I want SOP Labor Dance guidance in short cards,
So that preparation and process steps are easy to follow.

**Acceptance Criteria:**

**Given** the user opens SOP Labor Dance  
**When** the SOP screen loads  
**Then** it shows preparation, explanation, activity, evaluation, and documentation steps in readable cards  
**And** safety reminders are visible within the SOP flow  
**And** card text is readable on mobile screens  
**And** the SOP content works offline.

### Story 4.4: Build Breathing Exercise Catalog and Details

As a user,
I want to browse breathing exercise options,
So that I can choose a gentle exercise before or during preparation.

**Acceptance Criteria:**

**Given** breathing content exists  
**When** the user opens the breathing section  
**Then** she can see Napas Dalam, Napas Panjang, Napas Pendek, and Napas Relaksasi  
**And** each detail page explains purpose, preparation, steps, and safety notes  
**And** a start-practice action is available when activity eligibility allows it  
**And** blocked users receive safety guidance instead of a start action.

### Story 4.5: Build Labor Dance Movement List and Details

As a user,
I want to review Labor Dance movements with warnings,
So that I understand equipment, difficulty, and when to stop before practicing.

**Acceptance Criteria:**

**Given** movement content exists  
**When** the user opens the movement list  
**Then** each card shows name, illustration, difficulty, required equipment, and companion requirement  
**And** movement details include preparation, how to do it, benefits, safety notes, when to stop, equipment, and companion need  
**And** movements can be grouped by difficulty when useful  
**And** warning signs are visible before any start-practice action.

### Story 4.6: Connect Learning Content to Safe Practice Entry

As a user,
I want to move from learning to practice only when it is appropriate,
So that education can support action without bypassing safety.

**Acceptance Criteria:**

**Given** the user views breathing or movement details  
**When** she taps start practice  
**Then** the app checks onboarding, consent, first-use screening, and safety eligibility  
**And** eligible users continue to the session flow  
**And** ineligible users see safety guidance and remain able to read educational content  
**And** no learning screen starts a session directly without required gates.

## Epic 5: Safety-Gated Guided Session Flow

Users can complete a full safety-gated guided practice loop: pre-session check, VAS before, session selection, preparation, guided timer, pause/stop/emergency handling, emergency contact access, VAS after, and high-VAS safety guidance.

### Story 5.1: Implement Session State Engine and Route Guards

As a user,
I want the session flow to progress predictably,
So that I am never dropped into the wrong step.

**Acceptance Criteria:**

**Given** the session flow starts  
**When** session state changes  
**Then** it follows idle, safety_check, vas_before, preparation, running, paused, stopped, emergency_stopped, vas_after, completed, and saved stages  
**And** pre-session safety check is required before practice  
**And** VAS before is required before running state  
**And** route guards prevent users from skipping required stages.

### Story 5.2: Build Pre-Session Safety Check

As a user preparing to practice,
I want to confirm my current condition,
So that I stop before activity if risk signs are present.

**Acceptance Criteria:**

**Given** the user starts a session  
**When** the pre-session safety check is displayed  
**Then** it asks about bleeding, severe dizziness/faintness, severe or unusual pain, severe shortness of breath, chest pain, headache, muscle weakness, calf pain/swelling, regular painful contractions, leaking/gushing fluid, safe space, enough room, hydration, and companion readiness when needed  
**And** risky answers apply safety gating immediately  
**And** safe answers allow the user to continue to VAS before  
**And** the user can cancel the session without penalty.

### Story 5.3: Build VAS Before Assessment

As a user,
I want to record pain level before activity,
So that I can compare my comfort after the session.

**Acceptance Criteria:**

**Given** pre-session safety check is passed  
**When** the VAS before screen appears  
**Then** the user can select a score from 0 to 10  
**And** the selected score is displayed clearly with category label none, mild, moderate, or severe  
**And** the user cannot continue without selecting a score  
**And** scores 9-10 show safety guidance before continuing.

### Story 5.4: Build Session Selection and Preparation

As a user,
I want to choose a session and prepare safely,
So that I know what activity I am about to do.

**Acceptance Criteria:**

**Given** VAS before is complete  
**When** the user chooses a session  
**Then** she can select 5, 10, 20, or 30 minutes  
**And** session cards show duration, difficulty, movement sequence, equipment, and companion need  
**And** preparation guidance covers clothing, floor safety, water, birth ball if needed, and companion support  
**And** the primary action is `Saya Siap Mulai`.

### Story 5.5: Build Guided Timer and Movement Instruction Surface

As a practicing user,
I want clear timer and movement guidance,
So that I can follow the session calmly.

**Acceptance Criteria:**

**Given** the user starts the prepared session  
**When** the guided activity screen is running  
**Then** it shows timer, current movement, instruction text, illustration/animation placeholder, pause button, stop button, and emergency stop button  
**And** timer can start, pause, resume, and complete correctly  
**And** movement instructions advance according to session sequence  
**And** the UI remains readable and usable on mobile screens.

### Story 5.6: Implement Pause and Stop Controls

As a practicing user,
I want to pause, repeat, skip, or stop,
So that I stay in control of the activity.

**Acceptance Criteria:**

**Given** a session is running  
**When** the user taps pause  
**Then** a pause modal offers `Lanjutkan`, `Ulangi Gerakan`, `Lewati Gerakan`, and `Akhiri Sesi`  
**And** resume returns to the same movement and timer state  
**And** stop requires confirmation before ending normally  
**And** stopped sessions are marked incomplete unless they reach completion criteria.

### Story 5.7: Implement Emergency Stop and Contact Access

As a user who feels uncomfortable,
I want one clear emergency stop action,
So that I can end the session immediately and contact support.

**Acceptance Criteria:**

**Given** a session is running or paused  
**When** the user taps `Saya Merasa Tidak Nyaman` or emergency stop  
**Then** the session ends immediately as emergency_stopped  
**And** the app shows rest, hydration, and contact guidance without diagnosis  
**And** `Hubungi Pendamping` opens the phone dialer when a contact exists  
**And** missing contact shows a setup prompt instead of failing silently.

### Story 5.8: Build VAS After and Incomplete Result Behavior

As a user finishing or stopping a session,
I want to record or skip after-session pain level knowingly,
So that my result is accurate.

**Acceptance Criteria:**

**Given** a session reaches completion or normal stop  
**When** the VAS after screen appears  
**Then** the user can select a score from 0 to 10  
**And** the score is required before a complete result summary  
**And** skipping requires confirmation  
**And** skipped VAS after marks the result incomplete and excludes after-score trend calculations.

### Story 5.9: Apply High VAS Safety Guidance

As a user reporting severe pain,
I want the app to slow me down with safety guidance,
So that I am not pressured to continue activity.

**Acceptance Criteria:**

**Given** the user selects VAS 9 or 10 before or after activity  
**When** the score is submitted  
**Then** the app shows clear safety guidance to stop or consult a doctor/midwife if concerned  
**And** the app never claims the activity will reduce pain  
**And** the user can cancel, rest, or continue only where safety policy allows  
**And** the event is handled without logging the sensitive score value in analytics.

## Epic 6: Results, Local History, and VAS Progress

Users can save session outcomes locally, review activity history, inspect session details, delete records, and view VAS trends without the app making medical effectiveness claims.

### Story 6.1: Implement Local Session and VAS Persistence

As a returning user,
I want session and VAS data saved locally,
So that my history works offline without a backend.

**Acceptance Criteria:**

**Given** a session produces before/after VAS data or incomplete result data  
**When** the app saves records  
**Then** SQLite stores activity sessions and VAS records locally  
**And** records include activity type, session id, duration, before score, optional after score, note, status, emergency stop flag, and timestamps  
**And** repository helpers validate score ranges and required fields  
**And** sensitive values are not logged.

### Story 6.2: Build Claim-Safe Result Summary

As a user,
I want to see what I recorded before and after activity,
So that I can understand my self-reported comfort change.

**Acceptance Criteria:**

**Given** a session has ended  
**When** result summary is shown  
**Then** it displays before score, after score when available, difference, category change, duration, session type, and date/time  
**And** incomplete results are clearly marked  
**And** copy avoids medical-effectiveness claims  
**And** the user can save the result to history.

### Story 6.3: Build Activity History List

As a user,
I want to review previous sessions,
So that I can continue self-monitoring over time.

**Acceptance Criteria:**

**Given** saved activity records exist  
**When** the user opens `Riwayat Aktivitas`  
**Then** the app lists date, activity type, duration, VAS before, VAS after when present, and note preview  
**And** records are available offline  
**And** no-history state says `Belum ada riwayat aktivitas. Mulai sesi pertama Anda hari ini.`  
**And** tapping a record opens detail.

### Story 6.4: Build History Detail and Delete Record

As a user,
I want to inspect and delete a history item,
So that I control my local data.

**Acceptance Criteria:**

**Given** a history record exists  
**When** the user opens detail  
**Then** the app shows full session summary, VAS values, note, status, and emergency stop indicator when relevant  
**And** the user can delete the record after confirmation  
**And** deletion removes the record from history and progress calculations  
**And** failed deletion shows a safe error state.

### Story 6.5: Build VAS Progress Chart

As a returning user,
I want to see VAS trends over time,
So that I can self-monitor comfort patterns.

**Acceptance Criteria:**

**Given** multiple saved complete records exist  
**When** the user opens `Perkembangan Nyeri`  
**Then** the chart shows before and after score trends with week/month filters  
**And** it displays average before score, average after score, total completed sessions, and best improvement  
**And** incomplete records are handled according to chart rules  
**And** chart copy frames trends as self-reported monitoring, not medical proof.

## Epic 7: Privacy, Terms, Data Controls, and Settings

Users can manage app preferences, access privacy/terms/disclaimer content, and delete their local data from the settings area. No personal profile or emergency contact data is collected or managed.

### Story 7.1: Build Settings Screen

As a user,
I want a settings screen,
So that I can manage app preferences in one place.

**Acceptance Criteria:**

**Given** the user opens `Pengaturan`  
**When** the settings screen loads  
**Then** it shows voice guide, notification, language, privacy policy, terms/disclaimer, and delete local data options  
**And** no personal profile or emergency contact fields are shown  
**And** all settings work offline.

### Story 7.2: Provide Privacy, Terms, and Disclaimer Screens

_(Formerly Story 7.3 — Story 7.2 emergency contacts is removed because DiaMom does not collect emergency contact data.)_

As a user,
I want to revisit privacy, terms, and disclaimer information,
So that I understand how DiaMom handles safety and data.

**Acceptance Criteria:**

**Given** the user opens settings  
**When** she selects privacy, terms, or disclaimer  
**Then** the app shows Bahasa Indonesia content matching the product boundary and local-only privacy policy  
**And** the disclaimer can be read after onboarding  
**And** no screen claims legal or medical coverage beyond the app's defined scope  
**And** content is available offline.

### Story 7.3: Delete Local Data

_(Formerly Story 7.4)_

As a user,
I want to delete local DiaMom data,
So that I can remove sensitive pregnancy and activity records from my device.

**Acceptance Criteria:**

**Given** the user opens privacy/data settings  
**When** she chooses delete local data  
**Then** the app shows a clear confirmation explaining what will be removed  
**And** confirmed deletion removes safety screening, VAS records, activity sessions, settings, and reminders as appropriate  
**And** the app returns to first-launch/onboarding state after deletion  
**And** deletion errors are surfaced safely.

### Story 7.4: Add MVP Language Setting

_(Formerly Story 7.5)_

As a user,
I want language settings to be clear,
So that I understand Bahasa Indonesia is the MVP language.

**Acceptance Criteria:**

**Given** the user opens language settings  
**When** the MVP language screen is shown  
**Then** Bahasa Indonesia is the active language  
**And** English is presented as a future release only if shown at all  
**And** changing unsupported language does not create mixed copy  
**And** all MVP user-facing copy remains Bahasa Indonesia.

## Epic 8: Supportive Engagement: Voice Guidance, Music, and Reminders

Users can configure voice guidance, background music, volume, instruction speed, and gentle practice/hydration reminders to make sessions easier to follow and return to.

### Story 8.1: Build Voice Guide and Music Settings

As a user,
I want to configure voice and music preferences,
So that sessions feel calm and usable for me.

**Acceptance Criteria:**

**Given** the user opens `Pengaturan Panduan Suara`  
**When** settings are displayed  
**Then** she can toggle voice guide, toggle background music, set volume, and choose instruction speed  
**And** preferences persist locally  
**And** controls are accessible and readable  
**And** disabled audio settings are respected by future sessions.

### Story 8.2: Integrate Audio Playback With Session State

As a practicing user,
I want audio guidance to follow session controls,
So that I do not receive confusing instructions.

**Acceptance Criteria:**

**Given** audio preferences are enabled  
**When** a session starts, pauses, resumes, stops, or emergency stops  
**Then** voice guidance and background music follow the session state  
**And** audio stops on normal stop and emergency stop  
**And** audio pauses on pause  
**And** audio load failure shows an error state without blocking visual guidance.

### Story 8.3: Build Reminder Permission and Settings

As a user,
I want optional reminders,
So that I can return to breathing, movement, or hydration support.

**Acceptance Criteria:**

**Given** the user opens `Pengingat Latihan`  
**When** reminders are configured  
**Then** she can enable/disable reminders, choose reminder days, choose reminder time, and choose reminder type  
**And** notification permission is requested only when needed  
**And** permission denial shows a helpful state  
**And** reminder preferences are stored locally.

### Story 8.4: Schedule and Manage Local Notifications

As a user with reminders enabled,
I want reminders to trigger at my chosen times,
So that practice support is predictable.

**Acceptance Criteria:**

**Given** reminder settings are saved  
**When** notifications are scheduled  
**Then** Expo notifications are created for selected days/times/types  
**And** disabling reminders cancels scheduled notifications  
**And** changing settings updates scheduled notifications  
**And** notification content avoids sensitive health data.

## Epic 9: Resilience, Analytics Safety, QA, and Release Readiness

Users experience graceful empty/error states, recover interrupted sessions, and benefit from a tested Android MVP whose analytics and diagnostics avoid sensitive health data.

### Story 9.1: Implement Shared Empty and Error States

As a user,
I want clear states when something is missing or fails,
So that I know what to do next without panic.

**Acceptance Criteria:**

**Given** no history, no internet, failed result save, audio load failure, incomplete VAS, or interrupted session occurs  
**When** the corresponding state is shown  
**Then** the app uses consistent EmptyState or ErrorState components  
**And** copy is calm, actionable, and in Bahasa Indonesia  
**And** recovery actions are available where possible  
**And** layout remains accessible on mobile screens.

### Story 9.2: Recover Interrupted Sessions

As a user whose session is interrupted,
I want to resume or discard safely,
So that app interruptions do not corrupt my records.

**Acceptance Criteria:**

**Given** the app exits, a phone call interrupts, or the session is otherwise interrupted  
**When** the user returns  
**Then** the app detects the incomplete session draft  
**And** the user can resume or discard with confirmation  
**And** discarded sessions do not create complete history records  
**And** resumed sessions preserve safe session state without bypassing required checks.

### Story 9.3: Add Privacy-Safe Analytics and Diagnostics

As a product team,
I want basic flow analytics and diagnostics,
So that we can improve the app without collecting sensitive health data.

**Acceptance Criteria:**

**Given** analytics or error monitoring is enabled  
**When** product events are tracked  
**Then** events include only behavior names such as onboarding_started, session_started, emergency_stop_clicked, result_saved, and history_opened  
**And** VAS scores, pregnancy week, due date, names, phone numbers, notes, and activity details are excluded  
**And** crash/error reporting redacts sensitive values  
**And** analytics can be disabled if privacy review requires it.

### Story 9.4: Add Automated Tests for Safety-Critical Logic

As a development team,
I want safety-critical logic covered by tests,
So that future changes do not break the product's core safety promises.

**Acceptance Criteria:**

**Given** the app has VAS, safety, session, forms, and repositories  
**When** tests run  
**Then** unit tests cover VAS category mapping, safety risk logic, session transitions, form validation schemas, and repository functions  
**And** component tests cover VAS slider, safety checklist, timer controls, result summary, and history card  
**And** tests can be run through the documented script  
**And** failing tests block release readiness.

### Story 9.5: Complete Android MVP Release Readiness

As a product team,
I want an Android MVP release checklist completed,
So that DiaMom can be tested internally with confidence.

**Acceptance Criteria:**

**Given** implementation stories are complete  
**When** release readiness is checked  
**Then** Expo Doctor, typecheck, lint, tests, and Android preview/internal build validation pass  
**And** manual QA covers first launch, returning user, interrupted session, emergency stop, missing contact, no history, audio failure, notification permission denial, and high VAS warning  
**And** all release-blocking content is approved  
**And** known out-of-scope items such as backend sync, midwife dashboard, admin CMS, PDF export, iOS, English localization, and AI voice recap are documented for later discovery.
