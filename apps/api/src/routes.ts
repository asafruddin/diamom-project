import type {
  ParticipantConsentPayload,
  ParticipantDisclaimerPayload,
  ParticipantProfilePayload,
  ParticipantSafetyScreeningPayload,
  ParticipantVasRecordPayload,
  ResearcherLoginRequest,
} from "@diamom/contracts";
import {
  acceptParticipantDisclaimer,
  clearParticipantData,
  createParticipant,
  createParticipantVasRecord,
  getDashboardSummary,
  getParticipantSnapshot,
  getResearcherByUsername,
  grantParticipantConsent,
  saveParticipantIdentity,
  saveParticipantSafetyScreening,
  type createDatabase,
} from "@diamom/db";
import bcrypt from "bcryptjs";
import type { FastifyInstance } from "fastify";

import {
  issueParticipantAppToken,
  issueResearcherToken,
  logoutResearcherToken,
} from "./auth";

type RouteOptions = {
  db: ReturnType<typeof createDatabase>;
};

export async function registerRoutes(
  app: FastifyInstance,
  options: RouteOptions,
) {
  app.post("/v1/participant/bootstrap", async () => {
    const participant = await createParticipant(options.db);
    const token = await issueParticipantAppToken(app, options.db, participant);

    return {
      accessToken: token.accessToken,
      expiresAt: token.expiresAt,
      participant: await getParticipantSnapshot(options.db, participant.id),
    };
  });

  app.get(
    "/v1/participant/me",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      if (!request.participantAppClaims) {
        return reply.code(401).send({ message: "Sesi peserta tidak ditemukan." });
      }

      return getParticipantSnapshot(
        options.db,
        request.participantAppClaims.participantId,
      );
    },
  );

  app.post(
    "/v1/participant/disclaimer",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      const body = request.body as ParticipantDisclaimerPayload;

      if (!request.participantAppClaims || !body?.acceptedAt) {
        return reply.code(400).send({ message: "Waktu persetujuan wajib diisi." });
      }

      return acceptParticipantDisclaimer(
        options.db,
        request.participantAppClaims.participantId,
        body.acceptedAt,
      );
    },
  );

  app.post(
    "/v1/participant/profile",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      const body = request.body as ParticipantProfilePayload;

      if (
        !request.participantAppClaims ||
        !body?.motherName ||
        !body?.gpa ||
        !Number.isFinite(body.age) ||
        !Number.isFinite(body.dilationCm) ||
        !Number.isFinite(body.pregnancyWeek)
      ) {
        return reply.code(400).send({ message: "Data identitas ibu belum lengkap." });
      }

      return saveParticipantIdentity(
        options.db,
        request.participantAppClaims.participantId,
        body,
      );
    },
  );

  app.post(
    "/v1/participant/safety-screening",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      const body = request.body as ParticipantSafetyScreeningPayload;

      if (!request.participantAppClaims || !Array.isArray(body?.signs)) {
        return reply.code(400).send({ message: "Data skrining keamanan belum lengkap." });
      }

      return saveParticipantSafetyScreening(
        options.db,
        request.participantAppClaims.participantId,
        {
          hasRisk: body.signs.length < 6,
          signs: body.signs,
        },
      );
    },
  );

  app.post(
    "/v1/participant/vas-sessions",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      const body = request.body as ParticipantVasRecordPayload;

      if (
        !request.participantAppClaims ||
        !body?.activityTitle ||
        !body?.motherName ||
        !body?.recordedAt ||
        !body?.status ||
        !Number.isFinite(body.beforeScore) ||
        !Number.isFinite(body.afterScore)
      ) {
        return reply.code(400).send({ message: "Data hasil VAS belum lengkap." });
      }

      return createParticipantVasRecord(
        options.db,
        request.participantAppClaims.participantId,
        body,
      );
    },
  );

  app.post(
    "/v1/participant/research-consent",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      const body = request.body as ParticipantConsentPayload;

      if (!request.participantAppClaims || !body?.consentedAt) {
        return reply
          .code(400)
          .send({ message: "Waktu persetujuan penelitian wajib diisi." });
      }

      return {
        participant: await grantParticipantConsent(
          options.db,
          request.participantAppClaims.participantId,
          body,
        ),
      };
    },
  );

  app.delete(
    "/v1/participant/me",
    { preHandler: app.verifyParticipantApp },
    async (request, reply) => {
      if (!request.participantAppClaims) {
        return reply.code(401).send({ message: "Sesi peserta tidak ditemukan." });
      }

      await clearParticipantData(
        options.db,
        request.participantAppClaims.participantId,
      );

      return { success: true as const };
    },
  );

  app.post("/v1/researcher/login", async (request, reply) => {
    const body = request.body as ResearcherLoginRequest;

    if (!body?.username || !body?.password) {
      return reply.code(400).send({ message: "Username dan password wajib." });
    }

    const researcher = await getResearcherByUsername(options.db, body.username);

    if (!researcher) {
      return reply.code(401).send({ message: "Login peneliti tidak valid." });
    }

    const isMatch = await bcrypt.compare(body.password, researcher.passwordHash);

    if (!isMatch) {
      return reply.code(401).send({ message: "Login peneliti tidak valid." });
    }

    const token = await issueResearcherToken(app, options.db, researcher);

    return {
      accessToken: token.accessToken,
      expiresAt: token.expiresAt,
      researcher: {
        id: researcher.id,
        role: "researcher",
        username: researcher.username,
      },
    };
  });

  app.post(
    "/v1/researcher/logout",
    { preHandler: app.verifyResearcher },
    async (request) => {
      if (request.researcherClaims) {
        await logoutResearcherToken(options.db, request.researcherClaims.tokenId);
      }

      return { success: true as const };
    },
  );

  app.get(
    "/v1/researcher/dashboard/summary",
    { preHandler: app.verifyResearcher },
    async () => getDashboardSummary(options.db),
  );
}
