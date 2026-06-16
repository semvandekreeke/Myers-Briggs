import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

interface Params {
  params: { groupId: string };
}

/** GET /api/groups/:groupId — group detail with members. */
export async function GET(_req: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const group = await prisma.group.findUnique({
    where: { id: params.groupId },
    include: { members: { orderBy: { joinedAt: "asc" } } },
  });
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ group });
}

/** DELETE /api/groups/:groupId — owner-only group deletion. */
export async function DELETE(_req: Request, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const group = await prisma.group.findUnique({ where: { id: params.groupId } });
  if (!group) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (group.ownerId !== auth.userId)
    return NextResponse.json({ error: "Only the owner can delete this group." }, { status: 403 });

  await prisma.group.delete({ where: { id: params.groupId } });
  return NextResponse.json({ ok: true });
}
