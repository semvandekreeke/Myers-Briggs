import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, badRequest } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

/** GET /api/progress — the user's development progress across topics. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const rows = await prisma.developmentProgress.findMany({
    where: { userId: auth.userId },
  });
  return NextResponse.json({ progress: rows });
}

/**
 * PUT /api/progress — upsert the completed checklist items for a topic.
 * Body: { topic: string, completedItems: number[] }
 */
export async function PUT(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body?.topic || !Array.isArray(body.completedItems))
    return badRequest("`topic` and `completedItems[]` are required.");

  const row = await prisma.developmentProgress.upsert({
    where: { userId_topic: { userId: auth.userId, topic: body.topic } },
    create: {
      userId: auth.userId,
      topic: body.topic,
      completedItems: body.completedItems,
    },
    update: { completedItems: body.completedItems },
  });
  return NextResponse.json({ progress: row });
}
