import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { requireAdmin } from '../../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../../lib/apiResponse';

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    await requireAdmin();
    const paramsAfter = await params;
    const body = await request.json();
    const { content, pdfUrl } = body;

    if (!content && !pdfUrl) {
      return errorResponse('Either content or pdfUrl is required', 400);
    }

    const note = await prisma.note.create({
      data: {
        videoId: paramsAfter.videoId,
        content: content || null,
        pdfUrl: pdfUrl || null
      }
    });

    return successResponse(note);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error creating note:', error);
    return errorResponse('Failed to create note', 500);
  }
}