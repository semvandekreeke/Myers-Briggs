import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";
import { isDbConfigured } from "./prisma";

/**
 * Shared helpers for API route handlers.
 *
 * `requireUser` centralizes the two failure modes every protected endpoint
 * shares: no database configured (the app is in local-only mode) and no
 * signed-in user. Returning a typed discriminated union lets handlers bail
 * out cleanly.
 */
export type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; response: NextResponse };

export async function requireUser(): Promise<AuthResult> {
  if (!isDbConfigured()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Database not configured. Running in local-only mode." },
        { status: 503 }
      ),
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true, userId: session.user.id };
}

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}
