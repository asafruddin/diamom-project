import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";

import {
  createParticipantAppSession,
  createResearcherSession,
  getActiveParticipantAppSession,
  getActiveResearcherSession,
  revokeResearcherSession,
  type createDatabase,
} from "@diamom/db";
import fastifyJwt from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    verifyParticipantApp: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    verifyParticipantIngest: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    verifyResearcher: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    participantAppClaims?: {
      participantId: string;
      scope: "participant-app";
      tokenId: string;
    };
    participantClaims?: {
      participantId: string;
      scope: "participant-ingest";
      studyId: string;
      tokenId: string;
    };
    researcherClaims?: {
      researcherId: string;
      role: "researcher";
      tokenId: string;
      username: string;
    };
  }
}

type AuthPluginOptions = {
  db: ReturnType<typeof createDatabase>;
  researcherSecret: string;
};

export const authPlugin = fp<AuthPluginOptions>(async (app, options) => {
  await app.register(fastifyJwt, {
    secret: options.researcherSecret,
  });

  app.decorate(
    "verifyParticipantApp",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const claims = await request.jwtVerify<{
          participantId: string;
          scope: "participant-app";
          tokenId: string;
        }>();

        if (claims.scope !== "participant-app") {
          return reply.code(403).send({ message: "Akses peserta ditolak." });
        }

        const session = await getActiveParticipantAppSession(options.db, claims.tokenId);

        if (!session) {
          return reply.code(401).send({ message: "Sesi peserta tidak aktif." });
        }

        request.participantAppClaims = claims;
      } catch {
        return reply.code(401).send({ message: "Autentikasi peserta gagal." });
      }
    },
  );

  app.decorate(
    "verifyResearcher",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const claims = await request.jwtVerify<{
          researcherId: string;
          role: "researcher";
          tokenId: string;
          username: string;
        }>();

        if (claims.role !== "researcher") {
          return reply.code(403).send({ message: "Akses peneliti ditolak." });
        }

        const session = await getActiveResearcherSession(options.db, claims.tokenId);

        if (!session) {
          return reply.code(401).send({ message: "Sesi peneliti tidak aktif." });
        }

        request.researcherClaims = claims;
      } catch {
        return reply.code(401).send({ message: "Autentikasi peneliti gagal." });
      }
    },
  );

  app.decorate(
    "verifyParticipantIngest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const claims = await request.jwtVerify<{
          participantId: string;
          scope: "participant-ingest";
          studyId: string;
          tokenId: string;
        }>();

        if (claims.scope !== "participant-ingest") {
          return reply
            .code(403)
            .send({ message: "Token peserta tidak memiliki izin sinkronisasi." });
        }

        request.participantClaims = claims;
      } catch {
        return reply
          .code(401)
          .send({ message: "Token sinkronisasi peserta tidak valid." });
      }
    },
  );
});

export async function issueParticipantAppToken(
  app: FastifyInstance,
  db: ReturnType<typeof createDatabase>,
  participant: {
    id: string;
  },
) {
  const tokenId = crypto.randomUUID();
  const expiresInSeconds = 60 * 60 * 24 * 180;
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  await createParticipantAppSession(db, participant.id, tokenId, expiresAt);

  const accessToken = await app.jwt.sign(
    {
      participantId: participant.id,
      scope: "participant-app",
      tokenId,
    },
    {
      expiresIn: expiresInSeconds,
    },
  );

  return {
    accessToken,
    expiresAt: expiresAt.toISOString(),
    tokenId,
  };
}

export async function issueResearcherToken(
  app: FastifyInstance,
  db: ReturnType<typeof createDatabase>,
  researcher: {
    id: string;
    username: string;
  },
) {
  const tokenId = crypto.randomUUID();
  const expiresInSeconds = 60 * 60 * 12;
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  await createResearcherSession(db, researcher.id, tokenId, expiresAt);

  const accessToken = await app.jwt.sign(
    {
      researcherId: researcher.id,
      role: "researcher",
      tokenId,
      username: researcher.username,
    },
    {
      expiresIn: expiresInSeconds,
    },
  );

  return {
    accessToken,
    expiresAt: expiresAt.toISOString(),
    tokenId,
  };
}

export async function issueParticipantIngestToken(
  app: FastifyInstance,
  participant: {
    id: string;
    studyId: string;
  },
) {
  return app.jwt.sign(
    {
      participantId: participant.id,
      scope: "participant-ingest",
      studyId: participant.studyId,
      tokenId: crypto.randomUUID(),
    },
    {
      expiresIn: 60 * 60 * 24 * 180,
    },
  );
}

export async function logoutResearcherToken(
  db: ReturnType<typeof createDatabase>,
  tokenId: string,
) {
  await revokeResearcherSession(db, tokenId);
}
