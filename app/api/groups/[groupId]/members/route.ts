import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, badRequest } from "@/lib/api-helpers";
import { isValidType } from "@/lib/mbti";

export const dynamic = "force-dynamic";

interface Params {
  params: { groupId: string };
}

/**
 * POST /api/groups/:groupId/members — add a member (invite by name + type) or
 * join the group yourself.
 */
export async function POST(req: NextRequest, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body?.displayName || !isValidType(body.mbtiType))
    return badRequest("`displayName` and a valid `mbtiType` are required.");

  const member = await prisma.groupMember.create({
    data: {
      groupId: params.groupId,
      userId: body.self ? auth.userId : null,
      displayName: body.displayName,
      mbtiType: body.mbtiType.toUpperCase(),
    },
  });
  return NextResponse.json({ member }, { status: 201 });
}

/** DELETE /api/groups/:groupId/members?memberId=... — remove a member / leave. */
export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const memberId = req.nextUrl.searchParams.get("memberId");
  if (!memberId) return badRequest("`memberId` query param is required.");

  const member = await prisma.groupMember.findUnique({ where: { id: memberId } });
  if (!member || member.groupId !== params.groupId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Allow if removing yourself, or if you own the group.
  const group = await prisma.group.findUnique({ where: { id: params.groupId } });
  const isSelf = member.userId === auth.userId;
  const isOwner = group?.ownerId === auth.userId;
  if (!isSelf && !isOwner)
    return NextResponse.json({ error: "Not permitted." }, { status: 403 });

  await prisma.groupMember.delete({ where: { id: memberId } });
  return NextResponse.json({ ok: true });
}
