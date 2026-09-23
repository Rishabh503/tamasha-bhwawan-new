import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, description, questions } = body;

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    // Generate unique 6-digit code
    let joinCode = generatePin();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      const existing = await prisma.liveQuiz.findUnique({ where: { joinCode } });
      if (!existing) {
        isUnique = true;
      } else {
        joinCode = generatePin();
        attempts++;
      }
    }

    const quiz = await prisma.liveQuiz.create({
      data: {
        title,
        description,
        teacherId: user.id,
        joinCode: joinCode,
        questions: {
          create: questions.map((q, idx) => ({
            questionText: q.questionText,
            imageUrl: q.imageUrl,
            type: q.type || "MCQ",
            options: q.options || [],
            correctAns: q.correctAns,
            timeLimitSeconds: q.timeLimitSeconds || 30,
            order: idx,
          }))
        }
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[LIVE_QUIZ_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
