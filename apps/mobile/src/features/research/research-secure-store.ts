import * as SecureStore from "expo-secure-store";

import type { ResearcherSession } from "@diamom/contracts";

const PARTICIPANT_APP_TOKEN_KEY = "diamom-participant-app-token";
const RESEARCHER_SESSION_KEY = "diamom-researcher-session";

export async function deleteParticipantAppToken() {
  await SecureStore.deleteItemAsync(PARTICIPANT_APP_TOKEN_KEY);
}

export async function deleteResearcherSession() {
  await SecureStore.deleteItemAsync(RESEARCHER_SESSION_KEY);
}

export async function readParticipantAppToken() {
  return SecureStore.getItemAsync(PARTICIPANT_APP_TOKEN_KEY);
}

export async function readResearcherSession() {
  const raw = await SecureStore.getItemAsync(RESEARCHER_SESSION_KEY);

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as ResearcherSession;
}

export async function saveParticipantAppToken(token: string) {
  await SecureStore.setItemAsync(PARTICIPANT_APP_TOKEN_KEY, token);
}

export async function saveResearcherSession(session: ResearcherSession) {
  await SecureStore.setItemAsync(RESEARCHER_SESSION_KEY, JSON.stringify(session));
}
