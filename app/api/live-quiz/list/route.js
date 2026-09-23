import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const quizzes = await prisma.liveQuiz.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        teacher: {
          select: { name: true, email: true }
        },
        _count: {
          select: { questions: true }
        }
      }
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("[LIVE_QUIZ_LIST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
