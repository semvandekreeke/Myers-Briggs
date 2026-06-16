import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma, isDbConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/auth/register — create an email+password account.
 * Body: { name?: string, email: string, password: string }
 *
 * Stores a bcrypt hash (never the plaintext). After a 201, the client signs in
 * with the credentials provider.
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const name: string | undefined = body?.name?.trim() || undefined;
  const email: string | undefined = body?.email?.trim().toLowerCase();
  const password: string | undefined = body?.password;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hash },
  });

  // Never return the hash.
  return NextResponse.json(
    { ok: true, user: { id: user.id, email: user.email, name: user.name } },
    { status: 201 }
  );
}
