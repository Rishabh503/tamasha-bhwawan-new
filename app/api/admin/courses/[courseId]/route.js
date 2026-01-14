
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../lib/apiResponse';

export async function GET(request, { params }) {
  try {
    await requireAdmin();
    const paramsi = await params;
    const paramsid = paramsi.id;
    
    const course = await prisma.course.findFirst({
      where: { id: paramsid },
      include: {
        chapters: {
          orderBy: { order: 'asc' },
          include: {
            videos: {
              orderBy: { order: 'asc' },
              include: {
                notes: {
                  orderBy: { createdAt: 'desc' }
                },
                pyqs: true
              }
            }
          }
        },
        qrCode: true, // Include QR code relation
        _count: {
          select: {
            chapters: true,
            enrollments: true
          }
        }
      }
    });

    if (!course) {
      return errorResponse('Course not found', 404);
    }

    return successResponse(course);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error fetching course:', error);
    return errorResponse('Failed to fetch course', 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
const paramsAfter=await params
    const body = await request.json();
    const { title, description, imageUrl, isPublished, price, qrCodeId } = body;

    const course = await prisma.course.update({
      where: { id: paramsAfter.courseId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isPublished !== undefined && { isPublished }),
        ...(price !== undefined && { price }),
        ...(qrCodeId !== undefined && { qrCodeId })
      },
      include: {
        qrCode: true
      }
    });

    return successResponse(course);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error updating course:', error);
    return errorResponse('Failed to update course', 500);
  }
}


export async function DELETE(request, { params }) {
  try {
    await requireAdmin();

    await prisma.course.delete({
      where: { id: params.courseId }
    });

    return successResponse({ message: 'Course deleted successfully' });
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error deleting course:', error);
    return errorResponse('Failed to delete course', 500);
  }
}