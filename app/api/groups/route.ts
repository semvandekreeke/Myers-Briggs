import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, badRequest } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

/** GET /api/groups — groups the user owns or belongs to. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const groups = await prisma.group.findMany({
    where: {
      OR: [{ ownerId: auth.userId }, { members: { some: { userId: auth.userId } } }],
    },
    include: { members: true, _count: { select: { members: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ groups });
}

/** POST /api/groups — create a group; the creator joins as owner. */
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body?.name) return badRequest("`name` is required.");

  const user = await prisma.user.findUnique({ where: { id: auth.userId } });

  const group = await prisma.group.create({
    data: {
      name: body.name,
      description: body.description ?? null,
      ownerId: auth.userId,
      members: {
        create: {
          userId: auth.userId,
          displayName: user?.name ?? "You",
          mbtiType: user?.mbtiType ?? "UNKN",
          role: "owner",
        },
      },
    },
    include: { members: true },
  });

  return NextResponse.json({ group }, { status: 201 });
}
