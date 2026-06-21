import { create } from "zustand";

import type { ResearcherSession } from "@diamom/contracts";

import {
  deleteResearcherSession,
  readResearcherSession,
  saveResearcherSession,
} from "./research-secure-store";

interface ResearcherAuthState {
  hydrate: () => Promise<void>;
  isHydrated: boolean;
  logoutLocal: () => Promise<void>;
  session: ResearcherSession | null;
  setSession: (session: ResearcherSession) => Promise<void>;
}

export const useResearcherAuthStore = create<ResearcherAuthState>((set) => ({
  hydrate: async () => {
    const session = await readResearcherSession();
    set({
      isHydrated: true,
      session,
    });
  },
  isHydrated: false,
  logoutLocal: async () => {
    await deleteResearcherSession();
    set({ session: null });
  },
  session: null,
  setSession: async (session) => {
    await saveResearcherSession(session);
    set({ session });
  },
}));
