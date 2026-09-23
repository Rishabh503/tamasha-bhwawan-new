import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code")?.trim();

    if (!code) {
      return NextResponse.json({ error: "Game PIN is required" }, { status: 400 });
    }

    const quiz = await prisma.liveQuiz.findUnique({
      where: { joinCode: code },
      select: {
        id: true,
        title: true,
        status: true,
        joinCode: true
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: "No active quiz found with this Game PIN" }, { status: 404 });
    }

    return NextResponse.json({
      quizId: quiz.id,
      title: quiz.title,
      status: quiz.status,
      joinCode: quiz.joinCode
    });
  } catch (error) {
    console.error("[LIVE_QUIZ_FIND_BY_CODE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
