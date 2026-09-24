import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

export async function GET(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    const quiz = await prisma.liveQuiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: "asc" }
        },
        _count: {
          select: {
            questions: true,
            participants: true,
            sessions: true
          }
        }
      }
    });

    if (!quiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[LIVE_QUIZ_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    const body = await req.json();
    const { title, description, questions } = body;

    if (!title || !title.trim()) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return new NextResponse("At least one question is required", { status: 400 });
    }

    // Run in transaction: update quiz title/desc, replace questions
    const updatedQuiz = await prisma.$transaction(async (tx) => {
      // 1. Update basic info
      const quiz = await tx.liveQuiz.update({
        where: { id },
        data: {
          title: title.trim(),
          description: description?.trim() || null,
        }
      });

      // 2. Delete existing questions
      await tx.liveQuizQuestion.deleteMany({
        where: { quizId: id }
      });

      // 3. Re-create questions with updated orders
      await tx.liveQuizQuestion.createMany({
        data: questions.map((q, idx) => ({
          quizId: id,
          questionText: q.questionText || "",
          imageUrl: q.imageUrl || null,
          type: q.type || "MCQ",
          options: q.options || [],
          correctAns: q.correctAns || null,
          timeLimitSeconds: Number(q.timeLimitSeconds) || 30,
          order: idx,
        }))
      });

      // 4. Return updated quiz with questions
      return await tx.liveQuiz.findUnique({
        where: { id },
        include: {
          questions: {
            orderBy: { order: "asc" }
          }
        }
      });
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("[LIVE_QUIZ_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    const existingQuiz = await prisma.liveQuiz.findUnique({
      where: { id }
    });

    if (!existingQuiz) {
      return new NextResponse("Quiz not found", { status: 404 });
    }

    await prisma.liveQuiz.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("[LIVE_QUIZ_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
