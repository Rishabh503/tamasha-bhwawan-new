import prisma from "../../lib/prisma";

export async function POST() {
  try {
    const user = await prisma.user.create({
      data: {
        clerkUserId: "abcderfra",
        email: "rishabhkiemail.com",
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
