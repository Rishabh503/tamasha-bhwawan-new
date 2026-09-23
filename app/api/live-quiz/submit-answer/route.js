import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { pusherServer } from "../../../lib/pusher";

export async function POST(req) {
  try {
    const body = await req.json();
    const { participantId, questionId, answer, timeTaken } = body;

    const question = await prisma.liveQuizQuestion.findUnique({
      where: { id: questionId }
    });

    if (!question) return new NextResponse("Question not found", { status: 404 });

    const participant = await prisma.liveQuizParticipant.findUnique({
      where: { id: participantId }
    });

    if (!participant) return new NextResponse("Participant not found", { status: 404 });

    // Prevent duplicate submission for the same participant and question
    const existing = await prisma.liveQuizResponse.findUnique({
      where: {
        participantId_questionId: {
          participantId,
          questionId
        }
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const isCorrect = question.correctAns === answer;

    const response = await prisma.liveQuizResponse.create({
      data: {
        participantId,
        questionId,
        answer,
        isCorrect,
        timeTaken: typeof timeTaken === 'number' ? timeTaken : null
      }
    });

    if (isCorrect) {
      await prisma.liveQuizParticipant.update({
        where: { id: participantId },
        data: {
          score: { increment: 100 }
        }
      });
    }

    // Notify teacher dashboard with rich response payload for real-time live review
    await pusherServer.trigger(`quiz-${question.quizId}-teacher`, 'student-answered', { 
      participantId,
      participantName: participant.name,
      questionId,
      answer,
      isCorrect,
      timeTaken: typeof timeTaken === 'number' ? timeTaken : null
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("[LIVE_QUIZ_SUBMIT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
