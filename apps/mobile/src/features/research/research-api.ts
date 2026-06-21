import { Platform } from "react-native";

import type {
  DashboardSummary,
  ResearcherLoginRequest,
  ResearcherLogoutResponse,
  ResearcherSession,
} from "@diamom/contracts";

function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  return Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000";
}

async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response
      .json()
      .then((payload) =>
        typeof payload?.message === "string"
          ? payload.message
          : "Permintaan ke server gagal.",
      )
      .catch(() => "Permintaan ke server gagal.");
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function fetchResearchDashboardSummary(token: string) {
  return requestJson<DashboardSummary>("/v1/researcher/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
}

export function loginResearcher(payload: ResearcherLoginRequest) {
  return requestJson<ResearcherSession>("/v1/researcher/login", {
    body: JSON.stringify(payload),
    method: "POST",
  });
}

export function logoutResearcher(token: string) {
  return requestJson<ResearcherLogoutResponse>("/v1/researcher/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });
}
