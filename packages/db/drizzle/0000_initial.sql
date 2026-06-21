CREATE TABLE IF NOT EXISTS researchers (
  id text PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'researcher',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS researcher_sessions (
  id text PRIMARY KEY,
  researcher_id text NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  token_id text NOT NULL UNIQUE,
  issued_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);

CREATE TABLE IF NOT EXISTS participants (
  id text PRIMARY KEY,
  study_id text UNIQUE,
  mother_name text,
  age integer,
  dilation_cm integer,
  gpa text,
  pregnancy_week integer,
  disclaimer_accepted_at timestamptz,
  safety_signs jsonb,
  safety_has_risk boolean,
  safety_recorded_at timestamptz,
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS participant_app_sessions (
  id text PRIMARY KEY,
  participant_id text NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  token_id text NOT NULL UNIQUE,
  issued_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);

CREATE TABLE IF NOT EXISTS participant_consents (
  id text PRIMARY KEY,
  participant_id text NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  consented_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vas_sessions (
  id text PRIMARY KEY,
  participant_id text NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  external_session_id text NOT NULL,
  activity_title text NOT NULL,
  before_score integer NOT NULL,
  after_score integer NOT NULL,
  duration_minutes integer,
  mother_name text NOT NULL,
  status text NOT NULL,
  recorded_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS vas_sessions_participant_external_session_idx
  ON vas_sessions (participant_id, external_session_id);

CREATE TABLE IF NOT EXISTS sync_events (
  id text PRIMARY KEY,
  participant_id text NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
  sync_type text NOT NULL,
  status text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
