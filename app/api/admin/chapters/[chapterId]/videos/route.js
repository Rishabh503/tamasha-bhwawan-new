
import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma";
import { requireAdmin } from '../../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../../lib/apiResponse';

export async function POST(request, { params }) {
  try {
    await requireAdmin();
const paramsAfter=await params;
    const body = await request.json();
    const { title, description, youtubeUrl, order } = body;

    if (!title || !youtubeUrl) {
      return errorResponse('Title and YouTube URL are required');
    }

    // Get the max order if order not provided
    let videoOrder = order;
    if (videoOrder === undefined) {
      const maxOrder = await prisma.video.findFirst({
        where: { chapterId: paramsAfter.chapterId },
        orderBy: { order: 'desc' },
        select: { order: true }
      });
      videoOrder = maxOrder ? maxOrder.order + 1 : 1;
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        youtubeUrl,
        order: videoOrder,
        chapterId: paramsAfter.chapterId
      }
    });

    return successResponse(video, 201);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error creating video:', error);
    return errorResponse('Failed to create video', 500);
  }
}