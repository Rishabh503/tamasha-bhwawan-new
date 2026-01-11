import { Webhook } from "svix";
import prisma from "../../../lib/prisma"

export const runtime = "nodejs"; // still NEXT.JS

export async function POST(req) {
  const body = await req.text();

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing headers", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let event;
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    await prisma.user.upsert({
      where: { clerkUserId: event.data.id },
      update: {},
      create: {
        clerkUserId: event.data.id,
        email: event.data.email_addresses?.[0]?.email_address ?? null,
        onboardingCompleted: false,
        role: "USER",
      },
    });
  }

  return new Response("OK");
}
