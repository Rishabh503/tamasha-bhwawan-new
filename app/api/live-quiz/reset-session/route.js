import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

// Generate a random 6-digit PIN string
function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { quizId } = body;

    if (!quizId) {
      return new NextResponse("quizId is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    // Generate unique 6-digit code
    let joinCode = generatePin();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      const existing = await prisma.liveQuiz.findUnique({ where: { joinCode } });
      if (!existing || existing.id === quizId) {
        isUnique = true;
      } else {
        joinCode = generatePin();
        attempts++;
      }
    }

    // Mark previous active sessions for this quiz as COMPLETED if they weren't
    await prisma.liveQuizSession.updateMany({
      where: {
        quizId: quizId,
        status: { in: ["LOBBY", "IN_PROGRESS"] }
      },
      data: {
        status: "COMPLETED",
        endedAt: new Date()
      }
    });

    // Create a new fresh session
    const session = await prisma.liveQuizSession.create({
      data: {
        quizId: quizId,
        pin: joinCode,
        status: "LOBBY",
        startedAt: new Date()
      }
    });

    // Update quiz status to LOBBY and assign new joinCode
    const updatedQuiz = await prisma.liveQuiz.update({
      where: { id: quizId },
      data: {
        status: "LOBBY",
        joinCode: joinCode
      }
    });

    return NextResponse.json({
      success: true,
      quiz: updatedQuiz,
      session: session,
      joinCode: updatedQuiz.joinCode
    });
  } catch (error) {
    console.error("[LIVE_QUIZ_RESET_SESSION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
