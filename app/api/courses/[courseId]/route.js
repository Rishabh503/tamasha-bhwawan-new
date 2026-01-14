import prisma from "../../../lib/prisma";
import { successResponse, errorResponse, unauthorizedResponse } from '../../../lib/apiResponse';

export async function GET(request, { params }) {
  try {
    const { courseId } = await params;

    const course = await prisma.course.findUnique({
      where: { 
        id: courseId,
        isPublished: true 
      },
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
        qrCode: true, // Include QR code for payment page
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
    console.error('Error fetching course:', error);
    return errorResponse('Failed to fetch course', 500);
  }
}