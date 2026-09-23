import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return new NextResponse("Question ID is required", { status: 400 });
    }

    const question = await prisma.liveQuizQuestion.findUnique({
      where: { id: questionId },
      select: { imageUrl: true }
    });

    if (!question || !question.imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const rawUrl = question.imageUrl;

    // If it's a data URL, decode and return binary image
    if (rawUrl.startsWith("data:")) {
      const matches = rawUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");

        return new NextResponse(buffer, {
          headers: {
            "Content-Type": mimeType,
            "Content-Length": buffer.length.toString(),
            "Cache-Control": "public, max-age=86400, immutable"
          }
        });
      }
    }

    // If it's a regular URL, redirect
    return NextResponse.redirect(rawUrl);
  } catch (error) {
    console.error("[QUESTION_IMAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
