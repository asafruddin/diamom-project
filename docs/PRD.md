# DiaMom Mobile App — Complete Product Requirements Document (PRD)

**Version:** 1.0  
**Prepared for:** Mobile App Project Initiation  
**Platform:** React Native Expo SDK 55  
**Primary Language:** Bahasa Indonesia  
**Secondary Language:** English, planned for later release  
**Product Type:** Pregnancy support, labor preparation, guided breathing, guided movement, pain tracking  

---

## 1. Executive Summary

DiaMom is a mobile app designed to support pregnant mothers in preparing for labor through educational materials, breathing exercises, Labor Dance movement guidance, and Visual Analog Scale (VAS) pain tracking.

The current UI concept already covers the main user flow: welcome, home, materials, Labor Dance explanation, SOP, breathing, movement list, movement detail, VAS before activity, activity timer, VAS after activity, and result summary.

To make the app complete and production-ready, the app must add safety onboarding, pregnancy profile setup, medical disclaimer, pre-session safety check, emergency stop flow, activity history, progress tracking, profile management, voice guidance, notification reminders, and proper privacy handling.

DiaMom must be positioned as a **support and education companion**, not as a replacement for doctor, midwife, or hospital care.

---

## 2. Product Vision

To become a gentle, safe, and easy-to-use digital companion that helps pregnant mothers feel more prepared, calm, and supported before and during labor preparation.

---

## 3. Product Positioning

### Recommended Positioning

> DiaMom is a gentle pregnancy companion that helps mothers prepare for labor through breathing guidance, safe movement education, Labor Dance practice, and pain-level tracking.

### Avoid This Positioning

- An app that guarantees easier labor.
- An app that medically reduces labor pain.
- An app that replaces doctor or midwife care.
- An app that diagnoses pregnancy or labor conditions.

---

## 4. Product Goals

1. Help mothers understand Labor Dance and its purpose.
2. Provide safe, simple, guided breathing exercises.
3. Provide step-by-step Labor Dance movement guidance.
4. Let mothers record pain levels before and after activity using the VAS scale.
5. Help users view activity results and progress history.
6. Provide calming, supportive, and respectful maternity-focused UX.
7. Ensure every activity flow includes safety warnings and stop guidance.

---

## 5. Target Users

### 5.1 Primary User

Pregnant mothers, especially in the third trimester, who want gentle preparation for labor through breathing, safe movement, and self-monitoring.

### 5.2 Secondary User

Midwives, nurses, doulas, or maternity educators who want to use the app as a structured support tool during education or preparation sessions.

### 5.3 Support User

Husbands, partners, family members, or birth companions who may support the mother during breathing or Labor Dance sessions.

---

## 6. Medical and Safety Boundary

DiaMom must include a clear medical boundary across onboarding, activity screens, and settings.

### Required Disclaimer

> DiaMom is not a replacement for medical advice, diagnosis, or treatment. Always follow recommendations from your doctor, midwife, or healthcare provider. Stop the activity immediately if you feel unsafe or uncomfortable.

### Safety Principles

- User must confirm that they understand the disclaimer.
- User must complete safety screening before first use.
- User must complete quick safety check before every guided activity session.
- App must provide emergency stop action during activity.
- App must not make guaranteed medical claims.
- All maternity-related content should be reviewed by a qualified healthcare professional before release.

---

## 7. Current UI Coverage

The existing UI concept already includes:

| No | Screen | Status |
|---|---|---|
| 1 | Splash / Welcome | Existing |
| 2 | Main Menu / Home | Existing |
| 3 | Material List | Existing |
| 4 | Labor Dance Explanation | Existing |
| 5 | SOP Labor Dance | Existing |
| 6 | Breathing Exercise | Existing |
| 7 | Labor Dance Movement Menu | Existing |
| 8 | Movement Detail | Existing |
| 9 | Closing / Motivation | Existing |
| 10 | VAS Before Activity | Existing |
| 11 | Activity Execution / Timer | Existing |
| 12 | VAS After Activity | Existing |
| 13 | Result Summary | Existing |

Current core flow:

```text
Welcome
→ Home
→ Materials
→ VAS Before
→ Activity Timer
→ VAS After
→ Result Summary
```

---

## 8. Missing Pages and Required Additions

The following missing pages are required to make the app complete.

### 8.1 Onboarding Pages

Required screens:

```text
01. Onboarding Introduction
02. Mother Profile Setup
03. Pregnancy Information
04. Safety Screening
05. Doctor / Midwife Approval Confirmation
06. Medical Disclaimer & Consent
```

Purpose:

- Collect basic user profile.
- Understand pregnancy context.
- Make sure the user reads safety guidance.
- Prevent unsafe direct access to movement sessions.

---

### 8.2 Safety Checklist Page

Page title:

```text
Cek Kondisi Sebelum Mulai
```

Checklist:

```text
Saya tidak mengalami perdarahan
Saya tidak merasa pusing berat
Saya tidak mengalami nyeri hebat yang tidak biasa
Saya tidak mengalami sesak napas berat
Saya sudah berada di tempat yang aman
Saya memiliki cukup ruang untuk bergerak
Saya sudah minum air putih
Saya didampingi jika diperlukan
```

If user selects a risky condition, show:

```text
Sebaiknya hentikan aktivitas dan konsultasikan dengan dokter atau bidan terlebih dahulu.
```

---

### 8.3 Profile Pages

Required profile pages:

```text
Profile Overview
Edit Mother Profile
Pregnancy Detail
Emergency Contact
App Settings
Language Settings
Privacy & Data
```

Profile information:

```text
Nama Ibu
Usia Kehamilan
Hari Perkiraan Lahir
Kontak Darurat
Riwayat Aktivitas
Preferensi Bahasa
```

---

### 8.4 Activity History Page

Required page:

```text
Riwayat Aktivitas
```

Data shown:

```text
Tanggal
Jenis Aktivitas
Durasi
VAS Sebelum
VAS Sesudah
Catatan
```

Example:

```text
20 Mei 2026
Labor Dance Pemula
30 menit
Nyeri: 6 → 3
```

---

### 8.5 VAS Progress Chart Page

Required page:

```text
Perkembangan Nyeri
```

Content:

```text
Weekly VAS chart
Average pain before activity
Average pain after activity
Total completed sessions
Best improvement
```

---

### 8.6 Activity Selection Page

Required page:

```text
Pilih Sesi Latihan
```

Session options:

```text
5 Menit - Latihan Cepat
10 Menit - Pemula
20 Menit - Relaksasi
30 Menit - Sesi Lengkap
```

Each card must show:

```text
Duration
Difficulty
Required equipment
Need companion or not
```

---

### 8.7 Session Preparation Page

Required page:

```text
Persiapan Sebelum Latihan
```

Content:

```text
Gunakan pakaian nyaman
Pastikan lantai tidak licin
Siapkan air minum
Gunakan birth ball jika diperlukan
Pastikan ada pendamping jika dibutuhkan
```

Primary CTA:

```text
Saya Siap Mulai
```

---

### 8.8 Pause, Stop, and Emergency Modals

Required components:

```text
Pause Modal
Stop Confirmation Modal
Emergency Stop Modal
```

Pause actions:

```text
Lanjutkan
Ulangi Gerakan
Lewati Gerakan
Akhiri Sesi
```

Emergency action:

```text
Saya Merasa Tidak Nyaman
```

Emergency result screen:

```text
Sesi dihentikan. Silakan istirahat, minum air, dan hubungi pendamping, bidan, atau dokter jika keluhan berlanjut.
```

---

### 8.9 Emergency Contact Page

Required page:

```text
Kontak Darurat
```

Fields:

```text
Nama pendamping
Nomor telepon pendamping
Nama bidan / dokter
Nomor bidan / dokter
Nomor fasilitas kesehatan
```

During activity, show quick action:

```text
Hubungi Pendamping
```

---

### 8.10 Movement Warning Section

Each movement detail page must include:

```text
Perhatian
Kapan harus berhenti
Butuh pendamping atau tidak
Alat yang diperlukan
```

Example warning:

```text
Hentikan gerakan jika merasa pusing, nyeri hebat, sesak napas, perdarahan, atau tidak nyaman.
```

---

### 8.11 Voice Guide Settings

Required page/component:

```text
Pengaturan Panduan Suara
```

Controls:

```text
Voice guide on/off
Background music on/off
Volume
Instruction speed
```

---

### 8.12 Notification Reminder Page

Required page:

```text
Pengingat Latihan
```

Content:

```text
Aktifkan pengingat harian
Pilih jam latihan
Pilih hari latihan
Reminder minum air / relaksasi
```

---

### 8.13 Empty and Error States

Required states:

```text
No history yet
No internet connection
Failed to save result
Audio failed to load
Incomplete VAS assessment
Session interrupted
```

Example empty state:

```text
Belum ada riwayat aktivitas.
Mulai sesi pertama Anda hari ini.
```

---

## 9. Complete Recommended Screen List

```text
01. Splash Screen
02. Welcome / Onboarding Intro
03. Mother Profile Setup
04. Pregnancy Information
05. Safety Screening
06. Medical Disclaimer & Consent
07. Home Dashboard
08. Material List
09. Labor Dance Explanation
10. SOP Labor Dance
11. Breathing Exercise List
12. Breathing Exercise Detail
13. Labor Dance Movement List
14. Movement Detail
15. VAS Before Activity
16. Safety Check Before Session
17. Choose Session Duration
18. Session Preparation
19. Guided Activity Timer
20. Pause Modal
21. Stop Confirmation Modal
22. Emergency Stop Modal
23. VAS After Activity
24. Result Summary
25. Save Result Success
26. Activity History
27. VAS Progress Chart
28. Profile Overview
29. Edit Profile
30. Emergency Contact
31. Notification Settings
32. Voice Guide Settings
33. Privacy Policy
34. Terms & Disclaimer
35. Empty State Pages
36. Error State Pages
```

---

## 10. Recommended Final User Flow

### Main Activity Flow

```text
Splash
→ Onboarding / Profile Setup
→ Safety Screening
→ Medical Disclaimer
→ Home
→ Safety Check Before Session
→ VAS Before
→ Choose Session
→ Session Preparation
→ Guided Activity
→ VAS After
→ Result Summary
→ Save to History
```

### Learning Flow

```text
Home
→ Materi
→ Penjelasan Labor Dance
→ SOP Labor Dance
→ Gerakan Pernapasan
→ Gerakan Labor Dance
→ Start Practice
```

### History Flow

```text
Home
→ Riwayat Aktivitas
→ Activity Detail
→ VAS Progress Chart
```

### Emergency Flow

```text
Guided Activity
→ Saya Merasa Tidak Nyaman
→ Stop Session
→ Safety Message
→ Call Emergency Contact
```

---

## 11. Feature Requirements

### FR-001: Splash and Welcome

The app must show a branded splash/welcome screen with DiaMom identity and primary CTA.

Acceptance Criteria:

- User can tap `Mulai` to enter onboarding or home.
- First-time users go to onboarding.
- Returning users go to home.

---

### FR-002: Onboarding and Pregnancy Profile

The app must collect basic pregnancy and user profile information.

Fields:

- Name
- Pregnancy week
- Estimated due date
- First pregnancy status
- Doctor/midwife approval confirmation
- Emergency contact

Acceptance Criteria:

- User cannot finish onboarding without required fields.
- Pregnancy week must be valid.
- User must accept disclaimer before accessing activity features.

---

### FR-003: Safety Screening

The app must screen for basic safety risks before activity use.

Acceptance Criteria:

- User answers safety checklist.
- Risky answers show warning screen.
- User can still access educational materials but should be blocked or warned before activity sessions.

---

### FR-004: Home Dashboard

Home must show quick access to core features.

Sections:

- Greeting
- Today’s progress
- Start session CTA
- Materials
- VAS shortcut
- History shortcut

Acceptance Criteria:

- User can start a session in 3 taps or fewer.
- User can access materials, VAS, history, and profile.

---

### FR-005: Learning Materials

The app must provide structured educational content.

Modules:

- Penjelasan Labor Dance
- SOP Labor Dance
- Gerakan Pernapasan
- Gerakan Labor Dance
- Penutup / Motivation

Acceptance Criteria:

- User can view material list.
- User can open material detail.
- User can move to next/previous material.

---

### FR-006: SOP Labor Dance

The app must show preparation and process guidance.

SOP steps:

- Preparation
- Explanation
- Activity
- Evaluation
- Documentation

Acceptance Criteria:

- SOP is readable in short card format.
- SOP includes safety reminders.

---

### FR-007: Breathing Exercise

The app must provide breathing exercises with timer and audio guidance.

Types:

- Napas Dalam
- Napas Panjang
- Napas Pendek
- Napas Relaksasi

Acceptance Criteria:

- User can start/pause breathing exercise.
- User can hear voice guide if enabled.
- User can stop exercise safely.

---

### FR-008: Labor Dance Movement List

The app must show all available Labor Dance movements.

Each movement card includes:

- Name
- Illustration
- Difficulty
- Equipment required
- Companion requirement

Acceptance Criteria:

- User can open movement detail.
- Movement list is grouped by difficulty if needed.

---

### FR-009: Movement Detail

The app must explain how to perform each movement.

Sections:

- Preparation
- How to do it
- Benefits
- Safety notes
- When to stop

Acceptance Criteria:

- User can start practice from detail page.
- Safety notes are visible before activity.

---

### FR-010: VAS Before Activity

The app must let users select pain score from 0 to 10 before a session.

Acceptance Criteria:

- User can select score 0–10.
- Selected score is displayed clearly.
- User cannot continue without selecting score.
- Score is stored temporarily for the session.

---

### FR-011: Choose Session Duration

The app must let user choose activity duration.

Options:

- 5 minutes
- 10 minutes
- 20 minutes
- 30 minutes

Acceptance Criteria:

- User can select one session.
- Session detail shows duration, difficulty, movement sequence, and equipment.

---

### FR-012: Guided Activity Timer

The app must guide user through activity with timer, instructions, and safety actions.

Screen elements:

- Timer
- Current movement
- Illustration/animation
- Voice guide toggle
- Background music toggle
- Pause button
- Stop button
- Emergency stop button

Acceptance Criteria:

- Timer starts, pauses, resumes, and stops correctly.
- Emergency stop immediately ends session and shows safety message.
- User can access emergency contact from activity screen.

---

### FR-013: VAS After Activity

The app must collect pain score after activity.

Acceptance Criteria:

- User can select score 0–10.
- Score is required before result summary.
- User may skip with confirmation, but result will be marked incomplete.

---

### FR-014: Result Summary

The app must compare before and after pain score.

Summary data:

- Before score
- After score
- Difference
- Pain category change
- Duration
- Session type
- Date/time

Acceptance Criteria:

- User sees clear comparison.
- User can save result to history.
- App avoids overclaiming medical effectiveness.

---

### FR-015: Activity History

The app must save and display activity records.

Acceptance Criteria:

- User can view past sessions.
- User can open session detail.
- User can delete a record.
- History works offline.

---

### FR-016: Progress Chart

The app should show progress over time.

Acceptance Criteria:

- User can see VAS trend chart.
- User can filter by week/month.
- Chart includes before and after scores.

---

### FR-017: Profile and Settings

The app must provide profile and preference management.

Settings:

- Edit profile
- Emergency contact
- Language
- Voice guide
- Notifications
- Privacy policy
- Delete local data

Acceptance Criteria:

- User can edit and save profile.
- User can delete stored data.
- User can manage reminders.

---

## 12. Non-Functional Requirements

### Performance

- Initial app load should feel fast on mid-range Android devices.
- Main screens should render smoothly.
- Audio and animation should not block user interaction.

### Offline Support

- Learning materials available offline.
- Movement instructions available offline.
- VAS and history stored locally.
- Audio files can be bundled or downloaded for offline use in later release.

### Accessibility

- Large touch targets.
- Clear text contrast.
- Avoid tiny instruction text.
- Support screen reader labels.
- Support reduced motion where possible.
- Use simple, non-judgmental language.

### Privacy

- Pregnancy information and pain scores are sensitive.
- MVP should store data locally.
- If backend is added, data must use secure transport and proper consent.
- User must be able to delete local data.

### Security

- Store sensitive preferences securely where needed.
- Avoid logging health-related data in analytics.
- Do not expose personal information in crash logs.

---

## 13. Data Models

### 13.1 User Profile

```ts
export type UserProfile = {
  id: string;
  name: string;
  pregnancyWeek: number;
  estimatedDueDate?: string;
  isFirstPregnancy?: boolean;
  doctorApprovalConfirmed: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
  updatedAt: string;
};
```

### 13.2 Safety Screening

```ts
export type SafetyScreening = {
  id: string;
  userId: string;
  hasBleeding: boolean;
  hasSevereDizziness: boolean;
  hasUnusualSeverePain: boolean;
  hasSevereShortnessOfBreath: boolean;
  isBedRestRecommended: boolean;
  doctorProhibitsPhysicalActivity: boolean;
  completedAt: string;
};
```

### 13.3 VAS Record

```ts
export type VasRecord = {
  id: string;
  userId: string;
  beforeScore: number;
  afterScore?: number;
  beforeCategory: 'none' | 'mild' | 'moderate' | 'severe';
  afterCategory?: 'none' | 'mild' | 'moderate' | 'severe';
  activityType: 'breathing' | 'labor_dance';
  sessionId?: string;
  durationMinutes?: number;
  note?: string;
  createdAt: string;
};
```

### 13.4 Activity Session

```ts
export type ActivitySession = {
  id: string;
  title: string;
  type: 'breathing' | 'labor_dance';
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate';
  requiresCompanion: boolean;
  requiredEquipment?: string[];
  movements: string[];
};
```

### 13.5 Movement Content

```ts
export type MovementContent = {
  id: string;
  title: string;
  description: string;
  preparation: string[];
  steps: string[];
  benefits: string[];
  warnings: string[];
  difficulty: 'beginner' | 'intermediate';
  requiresCompanion: boolean;
  requiredEquipment?: string[];
  illustrationAsset: string;
  audioAsset?: string;
};
```

---

## 14. Analytics Events

Track only product behavior. Do not send personally identifiable health details unless there is explicit consent and compliant backend handling.

Recommended events:

```text
onboarding_started
onboarding_completed
safety_screening_completed
medical_disclaimer_accepted
home_opened
material_opened
vas_before_submitted
session_selected
session_started
session_paused
session_resumed
session_stopped
emergency_stop_clicked
session_completed
vas_after_submitted
result_saved
history_opened
profile_updated
notification_enabled
```

---

## 15. Edge Cases

```text
User exits app during session
User skips VAS after activity
User starts activity without completing safety checklist
User selects high pain score 9–10
User has no internet connection
User deletes history
Audio fails to load
Timer is interrupted by phone call
User changes pregnancy week after onboarding
User removes emergency contact
```

Recommended behavior:

- Save session draft locally.
- Resume or discard interrupted session with confirmation.
- Show safety warning for high VAS score.
- Never force user to continue activity.

---

## 16. MVP Scope

### Must Have

```text
Splash screen
Onboarding
Pregnancy profile setup
Medical disclaimer
Safety screening
Home dashboard
Material list
Labor Dance explanation
SOP Labor Dance
Breathing exercise list
Labor Dance movement list
Movement detail
VAS before activity
Pre-session safety check
Choose session duration
Session preparation
Guided activity timer
Pause / stop / emergency stop modal
VAS after activity
Result summary
Activity history
Profile overview
Emergency contact
Local data storage
```

### Should Have

```text
Voice guidance
Background music
Notification reminder
Progress chart
Delete local data
Language setting
Offline bundled materials
```

### Could Have

```text
PDF export
Midwife dashboard
Partner mode
Backend sync
Admin CMS
Wearable integration
AI voice recap
```

---

## 17. Release Plan

### Phase 1 — MVP

Focus:

- Safety-first onboarding.
- Education material.
- VAS before/after.
- Guided timer.
- History.

### Phase 2 — Engagement

Focus:

- Voice guide.
- Background music.
- Reminders.
- Progress chart.

### Phase 3 — Professional Use

Focus:

- PDF export.
- Midwife review mode.
- Admin content management.
- Optional backend sync.

---

## 18. Success Metrics

### Product Metrics

```text
Onboarding completion rate
Safety screening completion rate
Session start rate
Session completion rate
VAS before-after completion rate
History open rate
Weekly active users
Reminder opt-in rate
```

### UX Metrics

```text
User can start a session in under 3 taps from home
User can understand safety warning before activity
User can pause or stop activity easily
User can complete VAS input without confusion
```

### Health-Support Metrics

```text
Number of completed self-monitoring sessions
Average before-after VAS difference
Self-reported comfort after session
User satisfaction score
```

Important: treat these as self-reported comfort metrics, not medical proof.

---

## 19. Content Governance

All educational, Labor Dance, breathing, and safety copy must follow this process:

```text
Draft by product/content team
Review by midwife or medical expert
Approve before release
Version content
Store content locally for MVP
Move to CMS/backend in later version
```

MVP recommendation:

```text
Use local JSON content first.
Use backend CMS later after validation.
```

---

## 20. UI/UX Design Direction

### Visual Style

- Soft pink background.
- Purple primary color.
- Rounded cards.
- Gentle pregnancy illustrations.
- Calm and supportive tone.

### Suggested Colors

```text
Primary Purple: #A75CA8
Soft Pink Background: #FFF4F7
Card Background: #FFFFFF
Accent Pink: #F7B6C8
Text Dark Purple: #3D2545
Success Green: #66BFA3
Warning Orange: #F5A45D
Danger Red: #E96B6B
```

### Typography

```text
Heading: 20–24px, Semibold
Section title: 16–18px, Semibold
Body: 14–16px, Regular
Caption: 12px
Button: 15–16px, Semibold
```

### Bottom Navigation

Recommended tabs:

```text
Beranda
Materi
Latihan
VAS
Profil
```

Reason: `Latihan` should be separated because Labor Dance and breathing exercises are the core activity.

---

## 21. Biggest PM Concern

The biggest missing part is not visual design. The biggest missing part is **safety flow**.

Required safety flow:

```text
Medical Disclaimer
→ Safety Screening
→ Pre-Session Safety Check
→ Emergency Stop
→ Clear Warning Signs
```

The second biggest missing part is:

```text
History + Progress Tracking
```

Without history, the app feels like a one-time demo. With history, DiaMom becomes a real product that users can return to and monitor.
