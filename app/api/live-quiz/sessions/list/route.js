import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    // Fetch all sessions (or quizzes with completed history)
    const sessions = await prisma.liveQuizSession.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            _count: { select: { questions: true } }
          }
        },
        participants: {
          include: {
            responses: {
              select: {
                isCorrect: true,
                timeTaken: true
              }
            }
          }
        }
      }
    });

    // Format sessions with summary metrics
    const formattedSessions = sessions.map((s) => {
      const participantCount = s.participants.length;
      const scores = s.participants.map(p => p.score);
      const topScore = scores.length > 0 ? Math.max(...scores) : 0;
      const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

      return {
        id: s.id,
        quizId: s.quizId,
        quizTitle: s.quiz.title,
        pin: s.pin,
        status: s.status,
        totalQuestions: s.quiz._count.questions,
        participantCount,
        topScore,
        avgScore,
        startedAt: s.startedAt,
        endedAt: s.endedAt,
        createdAt: s.createdAt
      };
    });

    return NextResponse.json(formattedSessions);
  } catch (error) {
    console.error("[LIVE_QUIZ_SESSIONS_LIST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
