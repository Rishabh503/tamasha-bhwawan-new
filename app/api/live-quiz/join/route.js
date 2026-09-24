import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { pusherServer } from "../../../lib/pusher";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized. You must be logged in to participate in quizzes.", { status: 401 });
    }

    const body = await req.json();
    const { quizId, name } = body;

    if (!name?.trim()) return new NextResponse("Name is required", { status: 400 });

    let dbUserId = null;
    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (user) {
      dbUserId = user.id;
    }

    // Find the latest active session for this quiz if available
    const activeSession = await prisma.liveQuizSession.findFirst({
      where: { quizId: quizId },
      orderBy: { createdAt: "desc" }
    });

    const participant = await prisma.liveQuizParticipant.create({
      data: {
        quizId,
        sessionId: activeSession?.id || null,
        userId: dbUserId,
        name: name.trim(),
        status: "WAITING",
        score: 0
      }
    });

    // Notify teacher lobby of the new waiting request
    await pusherServer.trigger(`quiz-${quizId}-lobby`, 'student-joined', participant);

    return NextResponse.json(participant);
  } catch (error) {
    console.error("[LIVE_QUIZ_JOIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
