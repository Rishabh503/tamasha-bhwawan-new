import { getCurrentUser } from "../../lib/auth";
import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const authResult = await getCurrentUser();
    if (!authResult?.id) {
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

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Get ImageKit credentials
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      throw new Error('ImageKit credentials not configured');
    }

    // Create form data for ImageKit
    const imagekitFormData = new FormData();
    imagekitFormData.append('file', base64);
    imagekitFormData.append('fileName', `payment_${Date.now()}_${file.name}`);
    imagekitFormData.append('folder', '/payment_screenshots');
    imagekitFormData.append('useUniqueFileName', 'true');
    imagekitFormData.append('publicKey', publicKey);

    // Create authentication string (privateKey:)
    const authString = Buffer.from(`${privateKey}:`).toString('base64');

    // Upload to ImageKit
    const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
      },
      body: imagekitFormData,
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('ImageKit error:', responseText);
      throw new Error(`ImageKit upload failed: ${response.statusText}`);
    }

    const result = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      thumbnailUrl: result.thumbnailUrl || result.url
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ 
      success: false,
      error: err.message || "Upload failed" 
    }, { status: 500 });
  }
}