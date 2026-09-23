import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { pusherServer } from "../../../lib/pusher";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { quizId, currentQuestionId } = body;

    const quiz = await prisma.liveQuiz.findUnique({
      where: { id: quizId },
      include: {
        questions: { orderBy: { order: "asc" } }
      }
    });

    let nextQuestion;

    if (!currentQuestionId) {
      if (quiz.questions.length === 0) {
        await prisma.liveQuiz.update({
          where: { id: quizId },
          data: { status: "COMPLETED" }
        });
        await pusherServer.trigger(`quiz-${quizId}-play`, 'quiz-ended', { quizId });
        return NextResponse.json({ status: "COMPLETED" });
      }
      nextQuestion = quiz.questions[0];
    } else {
      const currentIndex = quiz.questions.findIndex(q => q.id === currentQuestionId);
      
      if (currentIndex === -1 || currentIndex === quiz.questions.length - 1) {
        // End of quiz
        await prisma.liveQuiz.update({
          where: { id: quizId },
          data: { status: "COMPLETED" }
        });

        await prisma.liveQuizSession.updateMany({
          where: { quizId: quizId, status: { in: ["LOBBY", "IN_PROGRESS"] } },
          data: { status: "COMPLETED", endedAt: new Date() }
        });

        await pusherServer.trigger(`quiz-${quizId}-play`, 'quiz-ended', { quizId });
        return NextResponse.json({ status: "COMPLETED" });
      }
      nextQuestion = quiz.questions[currentIndex + 1];
    }
    
    // Helper to keep Pusher payload lightweight (< 10KB limit)
    const getSafeImageUrl = (q) => {
      if (!q?.imageUrl) return null;
      if (q.imageUrl.startsWith("data:") || q.imageUrl.length > 500) {
        return `/api/live-quiz/question-image?questionId=${q.id}`;
      }
      return q.imageUrl;
    };

    const questionPayload = {
      id: nextQuestion.id,
      questionText: nextQuestion.questionText,
      imageUrl: getSafeImageUrl(nextQuestion),
      type: nextQuestion.type,
      options: nextQuestion.options,
      timeLimitSeconds: nextQuestion.timeLimitSeconds,
      order: nextQuestion.order
    };

    // Broadcast next question to all players
    await pusherServer.trigger(`quiz-${quizId}-play`, 'next-question', { 
      currentQuestion: questionPayload 
    });

    return NextResponse.json({ currentQuestion: questionPayload });
  } catch (error) {
    console.error("[LIVE_QUIZ_NEXT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
