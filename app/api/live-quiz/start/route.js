import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { pusherServer } from "../../../lib/pusher";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { quizId } = body;

    const quiz = await prisma.liveQuiz.update({
      where: { id: quizId },
      data: { status: "IN_PROGRESS" },
      include: {
        questions: { orderBy: { order: "asc" } }
      }
    });

    await prisma.liveQuizSession.updateMany({
      where: { quizId: quizId, status: "LOBBY" },
      data: { status: "IN_PROGRESS" }
    });

    // Helper to keep Pusher payload lightweight (< 10KB limit)
    const getSafeImageUrl = (q) => {
      if (!q?.imageUrl) return null;
      if (q.imageUrl.startsWith("data:") || q.imageUrl.length > 500) {
        return `/api/live-quiz/question-image?questionId=${q.id}`;
      }
      return q.imageUrl;
    };

    // Notify all accepted students in the lobby to redirect to play screen
    // We send the first question details (without answer)
    const firstQuestion = quiz.questions[0];
    const questionPayload = firstQuestion ? {
      id: firstQuestion.id,
      questionText: firstQuestion.questionText,
      imageUrl: getSafeImageUrl(firstQuestion),
      type: firstQuestion.type,
      options: firstQuestion.options,
      timeLimitSeconds: firstQuestion.timeLimitSeconds,
      order: firstQuestion.order
    } : null;

    await pusherServer.trigger(`quiz-${quizId}-lobby`, 'quiz-started', { 
      quizId,
      currentQuestion: questionPayload
    });

    return NextResponse.json({ quiz, currentQuestion: questionPayload });
  } catch (error) {
    console.error("[LIVE_QUIZ_START]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
