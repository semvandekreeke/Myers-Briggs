import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, badRequest } from "@/lib/api-helpers";
import { isValidType } from "@/lib/mbti";

export const dynamic = "force-dynamic";

/** GET /api/assessments — list the signed-in user's saved assessments. */
export async function GET() {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const assessments = await prisma.assessment.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ assessments });
}

/** POST /api/assessments — save a completed assessment and update the user's type. */
export async function POST(req: NextRequest) {
  const auth = await requireUser();
  if (!auth.ok) return auth.response;

  const body = await req.json().catch(() => null);
  if (!body || !isValidType(body.type)) return badRequest("Valid `type` is required.");

  const assessment = await prisma.assessment.create({
    data: {
      userId: auth.userId,
      type: body.type.toUpperCase(),
      answers: body.answers ?? {},
      scores: body.scores ?? {},
    },
  });

  // Keep the denormalized current type in sync.
  await prisma.user.update({
    where: { id: auth.userId },
    data: { mbtiType: body.type.toUpperCase() },
  });

  return NextResponse.json({ assessment }, { status: 201 });
}
