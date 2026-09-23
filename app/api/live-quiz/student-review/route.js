import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quizId");
    const participantId = searchParams.get("participantId");

    if (!quizId) {
      return new NextResponse("quizId is required", { status: 400 });
    }

    const quiz = await prisma.liveQuiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    let participant = null;
    let participantResponses = [];

    if (participantId) {
      participant = await prisma.liveQuizParticipant.findUnique({
        where: { id: participantId },
        include: {
          responses: true
        }
      });
      if (participant) {
        participantResponses = participant.responses;
      }
    }

    // Map each question with student's response
    const questionsReview = quiz.questions.map((q) => {
      const studentResponse = participantResponses.find((r) => r.questionId === q.id);

      return {
        id: q.id,
        order: q.order,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        type: q.type,
        options: q.options,
        correctAns: q.correctAns,
        timeLimitSeconds: q.timeLimitSeconds,
        studentAnswer: studentResponse?.answer || null,
        isCorrect: studentResponse?.isCorrect ?? false,
        timeTaken: studentResponse?.timeTaken || null,
        answered: Boolean(studentResponse)
      };
    });

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        status: quiz.status,
        totalQuestions: quiz.questions.length
      },
      participant: participant ? {
        id: participant.id,
        name: participant.name,
        score: participant.score,
        status: participant.status
      } : null,
      questions: questionsReview
    });
  } catch (error) {
    console.error("[LIVE_QUIZ_STUDENT_REVIEW]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
