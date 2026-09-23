import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { pusherServer } from "../../../lib/pusher";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { participantId, status } = body; // status: ACCEPTED or REJECTED

    const participant = await prisma.liveQuizParticipant.update({
      where: { id: participantId },
      data: { status }
    });

    // Notify the specific student
    await pusherServer.trigger(`participant-${participantId}`, 'status-update', participant);

    return NextResponse.json(participant);
  } catch (error) {
    console.error("[LIVE_QUIZ_ACCEPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
