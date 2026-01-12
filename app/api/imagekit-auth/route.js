import { NextResponse } from "next/server";
import imagekit from '../../lib/imagekit';
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    
    return NextResponse.json(authenticationParameters);
  } catch (err) {
    console.error("IMAGEKIT AUTH ERROR:", err);
    return NextResponse.json({ 
      error: "Authentication failed" 
    }, { status: 500 });
  }
}