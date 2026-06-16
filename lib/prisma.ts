import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. In development, Next.js hot-reload would otherwise
 * create a new client on every reload and exhaust DB connections, so we cache
 * it on `globalThis`.
 *
 * Note: the client is constructed lazily here, but it only opens a connection
 * on the first query — so importing this module without a configured database
 * (local-only mode) is harmless.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** True when a database is configured. API routes use this to fail gracefully. */
export const isDbConfigured = (): boolean => !!process.env.DATABASE_URL;
