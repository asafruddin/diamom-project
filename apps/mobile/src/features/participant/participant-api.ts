import { Platform } from "react-native";

import type {
  ParticipantAppSession,
  ParticipantConsentPayload,
  ParticipantConsentResponse,
  ParticipantDeleteResponse,
  ParticipantDisclaimerPayload,
  ParticipantProfilePayload,
  ParticipantSafetyScreeningPayload,
  ParticipantSnapshot,
  ParticipantVasRecordPayload,
} from "@diamom/contracts";

function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:4000"
    : "http://localhost:4000";
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const { headers, ...requestInit } = init ?? {};

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    const message = contentType.includes("application/json")
      ? await response
          .json()
          .then((payload) =>
            typeof payload?.message === "string"
              ? payload.message
              : "Permintaan ke server gagal.",
          )
          .catch(() => "Permintaan ke server gagal.")
      : response.status === 401
        ? "Server API memerlukan autentikasi. Periksa alamat API aplikasi."
        : "Permintaan ke server gagal.";

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

function withParticipantToken(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function bootstrapParticipantApp() {
  return requestJson<ParticipantAppSession>("/v1/participant/bootstrap", {
    body: "{}",
    method: "POST",
  });
}

export function fetchParticipantSnapshot(token: string) {
  return requestJson<ParticipantSnapshot>("/v1/participant/me", {
    headers: withParticipantToken(token),
    method: "GET",
  });
}

export function saveParticipantDisclaimer(
  token: string,
  payload: ParticipantDisclaimerPayload,
) {
  return requestJson<ParticipantSnapshot>("/v1/participant/disclaimer", {
    body: JSON.stringify(payload),
    headers: withParticipantToken(token),
    method: "POST",
  });
}

export function saveParticipantProfile(
  token: string,
  payload: ParticipantProfilePayload,
) {
  return requestJson<ParticipantSnapshot>("/v1/participant/profile", {
    body: JSON.stringify(payload),
    headers: withParticipantToken(token),
    method: "POST",
  });
}

export function saveParticipantSafetyScreening(
  token: string,
  payload: ParticipantSafetyScreeningPayload,
) {
  return requestJson<ParticipantSnapshot>("/v1/participant/safety-screening", {
    body: JSON.stringify(payload),
    headers: withParticipantToken(token),
    method: "POST",
  });
}

export function saveParticipantVasRecord(
  token: string,
  payload: ParticipantVasRecordPayload,
) {
  return requestJson<ParticipantSnapshot>("/v1/participant/vas-sessions", {
    body: JSON.stringify(payload),
    headers: withParticipantToken(token),
    method: "POST",
  });
}

export function saveParticipantResearchConsent(
  token: string,
  payload: ParticipantConsentPayload,
) {
  return requestJson<ParticipantConsentResponse>(
    "/v1/participant/research-consent",
    {
      body: JSON.stringify(payload),
      headers: withParticipantToken(token),
      method: "POST",
    },
  );
}

export function deleteParticipantAccount(token: string) {
  return requestJson<ParticipantDeleteResponse>("/v1/participant/me", {
    headers: withParticipantToken(token),
    method: "DELETE",
  });
}
