
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/apiResponse';

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { title, description, youtubeUrl, order } = body;

    const video = await prisma.video.update({
      where: { id: params.videoId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(youtubeUrl && { youtubeUrl }),
        ...(order !== undefined && { order })
      }
    });

    return successResponse(video);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error updating video:', error);
    return errorResponse('Failed to update video', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin();

    await prisma.video.delete({
      where: { id: params.videoId }
    });

    return successResponse({ message: 'Video deleted successfully' });
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error deleting video:', error);
    return errorResponse('Failed to delete video', 500);
  }
}