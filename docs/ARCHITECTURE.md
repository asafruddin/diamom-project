# DiaMom Mobile App — Technical Architecture

**Version:** 1.0  
**Target Framework:** React Native with Expo SDK 55  
**Architecture Goal:** Safety-first, offline-first, scalable mobile app for Labor Dance education, guided activity sessions, and VAS tracking.  

---

## 1. Technology Baseline

Use Expo SDK 55 as the project baseline.

Official Expo SDK 55 baseline:

```text
Expo SDK: 55
React Native: 0.83.x
React: 19.2.x
Minimum Node.js: 20.19.x
Architecture: React Native New Architecture only
```

Important notes:

- Expo SDK 55 uses React Native 0.83 and React 19.2.
- React Native New Architecture is required in SDK 55.
- Use a development build for native modules and production-like testing.
- During SDK 55 transition, use the SDK 55 template explicitly.

---

## 2. Project Creation

Recommended command:

```bash
pnpm create expo-app . --template default@sdk-55
```

Recommended package manager:

```bash
pnpm
```

Use `pnpm expo install` for Expo SDK packages because it installs versions compatible with the active Expo SDK.

---

## 3. Recommended Dependencies

### 3.1 Core Dependencies

These are expected from the Expo SDK 55 template:

```json
{
  "expo": "~55.x.x",
  "react": "19.2.x",
  "react-native": "0.83.x",
  "expo-router": "~55.x.x"
}
```

Do not manually guess Expo package versions. Use Expo install:

```bash
pnpm expo install expo-router react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated react-native-worklets
```

---

### 3.2 Expo Packages

Install packages likely needed for DiaMom:

```bash
pnpm expo install \
  expo-audio \
  expo-av \
  expo-blur \
  expo-constants \
  expo-device \
  expo-file-system \
  expo-font \
  expo-haptics \
  expo-image \
  expo-linear-gradient \
  expo-linking \
  expo-localization \
  expo-notifications \
  expo-secure-store \
  expo-splash-screen \
  expo-sqlite \
  expo-status-bar \
  expo-system-ui \
  expo-web-browser
```

Purpose:

| Package | Purpose |
|---|---|
| expo-audio | Voice guide, background music, audio instructions |
| expo-av | Optional compatibility for media playback if needed |
| expo-blur | Soft modal and card effects |
| expo-constants | App/environment constants |
| expo-device | Device info for notification setup and diagnostics |
| expo-file-system | Local files, future export, cached audio |
| expo-font | Custom fonts |
| expo-haptics | Soft haptic feedback for VAS slider and buttons |
| expo-image | Optimized image/illustration rendering |
| expo-linear-gradient | Gradient buttons/cards |
| expo-linking | Call emergency contact and deep linking |
| expo-localization | Language and locale handling |
| expo-notifications | Reminder notifications |
| expo-secure-store | Sensitive tokens/preferences if backend is added |
| expo-splash-screen | Splash screen control |
| expo-sqlite | Local offline database |
| expo-status-bar | Status bar styling |
| expo-system-ui | Native system UI color control |
| expo-web-browser | Future auth/help links |

Some official bundled versions visible in the current SDK 55 docs:

| Package | SDK 55 bundled version shown in docs |
|---|---|
| expo-sqlite | ~55.0.16 |
| expo-audio | ~55.0.14 |
| expo-notifications | ~55.0.23 |
| expo-file-system | ~55.0.21 |
| expo-haptics | ~55.0.14 |
| expo-ui | ~55.0.17 |
| react-native-reanimated | 4.2.1 |
| react-native-screens | ~4.23.0 |

Always verify again with:

```bash
pnpm expo install --check
pnpm expo-doctor
```

---

### 3.3 UI and Styling Packages

Recommended:

```bash
pnpm add nativewind tailwindcss
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react-native
```

Optional UI packages:

```bash
pnpm add react-native-svg
pnpm add -D react-native-svg-transformer
```

Purpose:

| Package | Purpose |
|---|---|
| nativewind | Tailwind-style styling in React Native |
| tailwindcss | Tailwind configuration |
| class-variance-authority | Variant-based component styling |
| clsx | Conditional class names |
| tailwind-merge | Merge Tailwind class strings safely |
| lucide-react-native | Consistent icons |
| react-native-svg | SVG illustrations/icons |
| react-native-svg-transformer | Import SVG assets as components |

---

### 3.4 State, Forms, and Validation

Recommended:

```bash
pnpm add zustand immer
pnpm add react-hook-form zod @hookform/resolvers
```

Purpose:

| Package | Purpose |
|---|---|
| zustand | Lightweight app state management |
| immer | Safer immutable updates |
| react-hook-form | Forms for onboarding, profile, settings |
| zod | Runtime schema validation |
| @hookform/resolvers | Connect Zod with React Hook Form |

---

### 3.5 Data, Storage, and Querying

Recommended MVP storage:

```bash
pnpm expo install expo-sqlite expo-secure-store
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

Purpose:

| Package | Purpose |
|---|---|
| expo-sqlite | Offline local database |
| expo-secure-store | Sensitive secure values |
| drizzle-orm | Typed database layer |
| drizzle-kit | Schema migration tooling |

Alternative simple MVP:

```bash
pnpm add @react-native-async-storage/async-storage
```

Use AsyncStorage only for simple preferences. Use SQLite for VAS records and history.

---

### 3.6 Charts and Progress Visualization

Recommended:

```bash
pnpm add victory-native react-native-skia
```

Alternative:

```bash
pnpm add react-native-gifted-charts
```

Purpose:

- VAS progress chart.
- Weekly pain trend.
- Session completion visualization.

If chart library compatibility with SDK 55 becomes an issue, build a simple custom chart using React Native views first.

---

### 3.7 Date and Time

Recommended:

```bash
pnpm add date-fns
```

Purpose:

- Format history dates.
- Filter records by week/month.
- Calculate pregnancy week if due date is provided.

---

### 3.8 Analytics and Error Monitoring

Recommended:

```bash
pnpm expo install expo-application
pnpm add @sentry/react-native
```

Optional analytics:

```bash
pnpm add posthog-react-native
```

Guideline:

- Do not track personally identifiable health details.
- Track flow events only.
- Avoid logging VAS score and pregnancy details unless there is explicit consent and privacy review.

---

### 3.9 Testing and Quality

Recommended:

```bash
pnpm add -D jest jest-expo @testing-library/react-native @testing-library/jest-native
pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D typescript
```

Optional E2E:

```bash
pnpm add -D detox
```

---

## 4. Recommended Folder Structure

```text

├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── onboarding/
│   │   ├── intro.tsx
│   │   ├── profile.tsx
│   │   ├── pregnancy.tsx
│   │   ├── safety-screening.tsx
│   │   └── consent.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── materials.tsx
│   │   ├── training.tsx
│   │   ├── vas.tsx
│   │   └── profile.tsx
│   ├── materials/
│   │   ├── [materialId].tsx
│   │   └── sop.tsx
│   ├── breathing/
│   │   ├── index.tsx
│   │   └── [exerciseId].tsx
│   ├── movements/
│   │   ├── index.tsx
│   │   └── [movementId].tsx
│   ├── session/
│   │   ├── safety-check.tsx
│   │   ├── vas-before.tsx
│   │   ├── choose-duration.tsx
│   │   ├── preparation.tsx
│   │   ├── timer.tsx
│   │   ├── vas-after.tsx
│   │   └── result.tsx
│   ├── history/
│   │   ├── index.tsx
│   │   └── [recordId].tsx
│   ├── settings/
│   │   ├── emergency-contact.tsx
│   │   ├── notifications.tsx
│   │   ├── voice-guide.tsx
│   │   ├── privacy.tsx
│   │   └── terms.tsx
│   └── modal/
│       ├── pause-session.tsx
│       ├── stop-session.tsx
│       └── emergency-stop.tsx
├── src/
│   ├── assets/
│   │   ├── audio/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── session/
│   │   └── vas/
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── routes.ts
│   │   └── safety.ts
│   ├── content/
│   │   ├── materials.id.json
│   │   ├── movements.id.json
│   │   ├── breathing.id.json
│   │   └── disclaimers.id.json
│   ├── db/
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   ├── migrations/
│   │   └── repositories/
│   ├── features/
│   │   ├── onboarding/
│   │   ├── materials/
│   │   ├── breathing/
│   │   ├── movements/
│   │   ├── session/
│   │   ├── vas/
│   │   ├── history/
│   │   └── profile/
│   ├── hooks/
│   ├── lib/
│   │   ├── analytics.ts
│   │   ├── audio.ts
│   │   ├── notifications.ts
│   │   ├── storage.ts
│   │   └── validation.ts
│   ├── services/
│   │   ├── emergency-call.service.ts
│   │   ├── session.service.ts
│   │   └── vas.service.ts
│   ├── stores/
│   │   ├── app.store.ts
│   │   ├── session.store.ts
│   │   └── user.store.ts
│   ├── theme/
│   │   ├── index.ts
│   │   └── typography.ts
│   ├── types/
│   └── utils/
├── app.config.ts
├── eas.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 5. Navigation Architecture

Use Expo Router file-based routing.

### Route Groups

```text
onboarding/    First-time setup flow
(tabs)/        Main app tabs
materials/     Educational content
breathing/     Breathing exercise flow
movements/     Movement list and detail
session/       Guided activity flow
history/       Activity records
settings/      Profile, emergency, privacy, notifications
modal/         Pause, stop, emergency dialogs
```

### Main Tabs

```text
Beranda
Materi
Latihan
VAS
Profil
```

### Protected Entry Logic

At app start:

```text
If first launch or disclaimer not accepted:
  redirect to /onboarding/intro
Else:
  redirect to /(tabs)/home
```

Before activity session:

```text
If safety screening incomplete:
  redirect to /onboarding/safety-screening
Else:
  redirect to /session/safety-check
```

---

## 6. Application Architecture Pattern

Recommended pattern:

```text
Feature-first architecture
Local-first data
Service/repository layer
Typed validation using Zod
Lightweight global state with Zustand
Expo Router for navigation
SQLite for persistent records
Static JSON for MVP content
```

Layering:

```text
UI Screen
→ Feature Component
→ Hook
→ Service
→ Repository
→ SQLite / SecureStore / Local JSON
```

Example:

```text
/session/result.tsx
→ useSessionResult()
→ session.service.ts
→ vas.repository.ts
→ expo-sqlite
```

---

## 7. Local Database Design

Use `expo-sqlite` with typed repository helpers.

### Tables

```sql
users
safety_screenings
activity_sessions
vas_records
settings
notification_reminders
content_versions
```

### users

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  pregnancy_week INTEGER,
  estimated_due_date TEXT,
  is_first_pregnancy INTEGER,
  doctor_approval_confirmed INTEGER NOT NULL DEFAULT 0,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### vas_records

```sql
CREATE TABLE vas_records (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  before_score INTEGER NOT NULL,
  after_score INTEGER,
  activity_type TEXT NOT NULL,
  session_id TEXT,
  duration_minutes INTEGER,
  note TEXT,
  created_at TEXT NOT NULL
);
```

### activity_sessions

```sql
CREATE TABLE activity_sessions (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  started_at TEXT,
  completed_at TEXT,
  status TEXT NOT NULL,
  emergency_stopped INTEGER NOT NULL DEFAULT 0
);
```

### settings

```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

---

## 8. State Management

Use Zustand for:

```text
Current session state
Current VAS before/after values
Onboarding progress
User preference cache
Temporary UI state
```

Persist long-term records in SQLite, not only Zustand.

### Stores

```text
app.store.ts
- hasCompletedOnboarding
- hasAcceptedDisclaimer
- language
- theme

user.store.ts
- user profile snapshot
- emergency contact snapshot

session.store.ts
- selectedSession
- beforeVas
- afterVas
- timerStatus
- remainingSeconds
- currentMovementIndex
- isEmergencyStopped
```

---

## 9. Content Architecture

For MVP, use local JSON files:

```text
src/content/materials.id.json
src/content/movements.id.json
src/content/breathing.id.json
src/content/disclaimers.id.json
```

Each content item should have:

```ts
export type ContentItem = {
  id: string;
  title: string;
  description: string;
  body: string;
  illustrationAsset?: string;
  audioAsset?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  version: string;
};
```

Future version:

```text
Backend CMS
Content versioning
Medical reviewer approval
Remote content update
Offline cache
```

---

## 10. Session Engine

The session engine controls Labor Dance and breathing activities.

### Session Stages

```text
idle
safety_check
vas_before
preparation
running
paused
stopped
emergency_stopped
vas_after
completed
saved
```

### Session Rules

- User cannot start session without pre-session safety check.
- User cannot continue to result without VAS before.
- User may skip VAS after only with confirmation.
- Emergency stop must end session immediately.
- Interrupted sessions should be saved as incomplete.

### Timer Behavior

```text
startTimer()
pauseTimer()
resumeTimer()
stopTimer()
emergencyStop()
completeSession()
```

---

## 11. VAS Module

### Score Mapping

```ts
export function getVasCategory(score: number) {
  if (score === 0) return 'none';
  if (score >= 1 && score <= 3) return 'mild';
  if (score >= 4 && score <= 6) return 'moderate';
  return 'severe';
}
```

### UX Rules

- Slider range: 0–10.
- Large number display.
- Category label.
- Color-coded visual indicator.
- Save before and after score.
- High score 9–10 should show safety guidance.

---

## 12. Notification Architecture

Use `expo-notifications`.

Reminder use cases:

```text
Daily breathing reminder
Labor Dance practice reminder
Hydration/relaxation reminder
```

Notification settings:

```text
Enabled/disabled
Reminder days
Reminder time
Reminder type
```

Store reminders in SQLite and system notifications.

---

## 13. Audio Architecture

Use `expo-audio` for:

```text
Voice guidance
Breathing instruction audio
Background music
Movement instruction audio
```

Audio rules:

- User can enable/disable voice guide.
- User can enable/disable background music.
- Audio must stop when session stops.
- Audio must pause when session pauses.
- App should handle audio load failure gracefully.

---

## 14. Emergency Contact Architecture

Use `expo-linking` to open phone dialer.

Example behavior:

```text
User taps Hubungi Pendamping
→ app opens tel:{phoneNumber}
```

Rules:

- Phone number must be optional but recommended.
- If no phone number exists, show setup prompt.
- Emergency stop page must show contact action.

---

## 15. Privacy and Security Architecture

### MVP

```text
Store records locally only
No backend account
No cloud sync
No health data analytics
Allow delete local data
```

### Future Backend

If backend is added:

```text
Use authentication
Use encrypted transport
Use consent-based sync
Store minimal health data
Provide export/delete data options
Add privacy policy and terms
```

### Sensitive Data Handling

Sensitive:

```text
Pregnancy week
Due date
VAS score
Activity history
Emergency contact
```

Do not log these values in:

```text
Console logs
Analytics events
Crash reports
Remote debugging sessions
```

---

## 16. Design System Architecture

### Theme Tokens

```ts
export const colors = {
  primary: '#A75CA8',
  background: '#FFF4F7',
  card: '#FFFFFF',
  accentPink: '#F7B6C8',
  textPrimary: '#3D2545',
  success: '#66BFA3',
  warning: '#F5A45D',
  danger: '#E96B6B',
};
```

### Components

```text
AppScreen
AppHeader
AppCard
AppButton
AppIconButton
AppModal
SafetyAlert
VasSlider
TimerDisplay
MovementCard
MaterialCard
HistoryCard
EmptyState
ErrorState
```

### Button Variants

```text
primary
secondary
outline
danger
ghost
```

---

## 17. Environment Configuration

Use `app.config.ts`.

Example:

```ts
export default {
  expo: {
    name: 'DiaMom',
    slug: 'diamom',
    scheme: 'diamom',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    plugins: [
      'expo-router',
      'expo-splash-screen',
      'expo-secure-store',
      'expo-sqlite',
      'expo-notifications',
      'expo-audio',
    ],
  },
};
```

---

## 18. EAS Build Setup

Install EAS CLI:

```bash
pnpm add -g eas-cli
```

Login:

```bash
eas login
```

Configure:

```bash
eas build:configure
```

Example `eas.json`:

```json
{
  "cli": {
    "version": ">= 16.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

Build commands:

```bash
eas build --profile development --platform android
eas build --profile preview --platform android
eas build --profile production --platform android
```

For iOS later:

```bash
eas build --profile production --platform ios
```

---

## 19. Development Scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "doctor": "expo-doctor",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "jest",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 20. Quality Checklist

Before release:

```text
Onboarding completed successfully
Disclaimer accepted and stored
Safety screening works
Pre-session safety check blocks risky flow
VAS before required
Timer pause/resume works
Emergency stop works
VAS after works
Result saved locally
History displays records
Profile edit works
Emergency contact dialer works
Notifications request permission correctly
Audio guide works
Offline mode works
App passes expo-doctor
Android preview build tested
```

---

## 21. Testing Strategy

### Unit Tests

Test:

```text
VAS category mapping
Session state transitions
Safety screening risk logic
Form validation schemas
Repository functions
```

### Component Tests

Test:

```text
VAS slider
Safety checklist
Session timer controls
Result summary
History card
```

### Manual QA

Test:

```text
First launch flow
Returning user flow
Interrupted session
Emergency stop
No emergency contact
No history empty state
Audio failure
Notification permission denied
High VAS score warning
```

---

## 22. Future Backend Architecture

Not required for MVP, but recommended later.

Possible stack:

```text
Supabase
PostgreSQL
Supabase Auth
Supabase Storage
Admin CMS table
Edge Functions for PDF export
```

Future features:

```text
Cloud backup
Midwife dashboard
PDF report export
Admin content management
Content version review
Remote notifications
```

---

## 23. Implementation Priority

### Sprint 1

```text
Project setup
Design system
Navigation
Splash
Onboarding
Profile setup
Disclaimer
Safety screening
```

### Sprint 2

```text
Home
Material list
Material detail
SOP
Breathing list
Movement list
Movement detail
```

### Sprint 3

```text
VAS before
Session selection
Preparation
Timer
Pause/stop/emergency modals
VAS after
Result summary
```

### Sprint 4

```text
SQLite persistence
History
Profile settings
Emergency contact
Notifications
Voice settings
QA and release build
```

---

## 24. Recommended First Build Target

Start with Android MVP first.

Target:

```text
Android internal testing build
Offline-first MVP
Bahasa Indonesia only
No backend
Local SQLite storage
Bundled content and illustrations
```

After MVP validation, continue with:

```text
iOS support
English localization
Backend sync
PDF export
Midwife/admin features
```
