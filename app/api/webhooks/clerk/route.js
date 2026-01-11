import { Webhook } from "svix";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const payload = await req.text();
  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing headers", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

 if (evt.type === "user.created") {
  console.log("✅ user.created received");
  console.log("User ID:", evt.data.id);
  console.log("Emails:", evt.data.email_addresses);

  await prisma.user.create({
    data: {
      clerkUserId: evt.data.id,
      email: evt.data.email_addresses?.[0]?.email_address || "no-email",
      onboardingCompleted: false,
      role: "USER",
    },
  });

  console.log("✅ User saved in DB");
}


  return new Response("OK", { status: 200 });
}
