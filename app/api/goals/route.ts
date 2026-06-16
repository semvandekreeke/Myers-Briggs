import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, badRequest } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

/** GET /api/goals — list the user's goals. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const goals = await prisma.goal.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ goals });
}

/** POST /api/goals — create a goal. */
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body?.title) return badRequest("`title` is required.");

  const goal = await prisma.goal.create({
    data: {
      userId: auth.userId,
      title: body.title,
      topic: body.topic ?? null,
    },
  });
  return NextResponse.json({ goal }, { status: 201 });
}

/** PATCH /api/goals — toggle/update a goal by id. */
export async function PATCH(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body?.id) return badRequest("`id` is required.");

  // Ensure the goal belongs to the user before mutating.
  const existing = await prisma.goal.findUnique({ where: { id: body.id } });
  if (!existing || existing.userId !== auth.userId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const goal = await prisma.goal.update({
    where: { id: body.id },
    data: { done: typeof body.done === "boolean" ? body.done : existing.done },
  });
  return NextResponse.json({ goal });
}

/** DELETE /api/goals?id=... — delete a goal. */
export async function DELETE(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return badRequest("`id` query param is required.");

  const existing = await prisma.goal.findUnique({ where: { id } });
  if (!existing || existing.userId !== auth.userId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.goal.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
