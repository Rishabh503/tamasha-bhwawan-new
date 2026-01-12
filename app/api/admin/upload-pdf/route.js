import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const authResult = await auth();
    if (!authResult?.userId) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ 
        success: false,
        error: "No file provided" 
      }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ 
        success: false,
        error: "Only PDF files are allowed" 
      }, { status: 400 });
    }

    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    const ImageKit = (await import('imagekit')).default;
    
    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint
    });

    const result = await imagekit.upload({
      file: base64,
      fileName: `notes_${Date.now()}_${file.name}`,
      folder: '/course_notes',
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
    });

  } catch (err) {
    console.error("PDF UPLOAD ERROR:", err);
    return NextResponse.json({ 
      success: false,
      error: err.message || "Upload failed" 
    }, { status: 500 });
  }
}