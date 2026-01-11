import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma"; 

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { phone } = await req.json();

  if (!phone) {
    return new Response("Phone required", { status: 400 });
  }

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: {
      phone,
      onboardingCompleted: true,
    },
  });

  return new Response("OK", { status: 200 });
}
