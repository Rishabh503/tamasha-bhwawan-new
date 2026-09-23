import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quizId");
    const sessionId = searchParams.get("sessionId");

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

    // Determine target session if available
    let targetSessionId = sessionId;
    if (!targetSessionId) {
      const latestSession = await prisma.liveQuizSession.findFirst({
        where: { quizId: quizId },
        orderBy: { createdAt: "desc" }
      });
      targetSessionId = latestSession?.id || null;
    }

    // Filter participants by session if session exists, else all participants
    const participantWhere = targetSessionId
      ? { quizId, sessionId: targetSessionId }
      : { quizId };

    const participants = await prisma.liveQuizParticipant.findMany({
      where: participantWhere,
      include: {
        responses: {
          include: {
            question: {
              select: {
                id: true,
                order: true,
                correctAns: true
              }
            }
          }
        }
      }
    });

    const totalQuestions = quiz.questions.length;

    // Build participant standings
    const leaderboard = participants.map((p) => {
      const correctAnswers = p.responses.filter((r) => r.isCorrect).length;
      const totalAnswers = p.responses.length;
      const totalTimeTaken = p.responses.reduce((sum, r) => sum + (r.timeTaken || 0), 0);

      // Student question-by-question breakdown map
      const answersMap = {};
      p.responses.forEach((r) => {
        answersMap[r.questionId] = {
          answer: r.answer,
          isCorrect: r.isCorrect,
          timeTaken: r.timeTaken
        };
      });

      return {
        id: p.id,
        userId: p.userId,
        name: p.name,
        status: p.status,
        score: p.score,
        correctAnswers,
        totalAnswers,
        totalQuestions,
        totalTimeTaken,
        answersMap
      };
    });

    // Sort by score desc, then totalTimeTaken asc
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.totalTimeTaken - b.totalTimeTaken;
    });

    const rankedLeaderboard = leaderboard.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    // Build Question-Level Analytics (How many students picked each option / got it right)
    const questionsAnalytics = quiz.questions.map((q) => {
      const optionCounts = {};
      (q.options || []).forEach((opt) => {
        optionCounts[opt] = 0;
      });

      let correctCount = 0;
      let answeredCount = 0;

      participants.forEach((p) => {
        const resp = p.responses.find((r) => r.questionId === q.id);
        if (resp) {
          answeredCount++;
          if (resp.isCorrect) correctCount++;
          if (optionCounts[resp.answer] !== undefined) {
            optionCounts[resp.answer]++;
          } else {
            optionCounts[resp.answer] = 1;
          }
        }
      });

      return {
        id: q.id,
        order: q.order,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        options: q.options,
        correctAns: q.correctAns,
        timeLimitSeconds: q.timeLimitSeconds,
        answeredCount,
        correctCount,
        accuracyPercent: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
        optionCounts
      };
    });

    return NextResponse.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        status: quiz.status,
        joinCode: quiz.joinCode,
        totalQuestions,
        sessionId: targetSessionId
      },
      leaderboard: rankedLeaderboard,
      questionsAnalytics
    });
  } catch (error) {
    console.error("[LIVE_QUIZ_LEADERBOARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
