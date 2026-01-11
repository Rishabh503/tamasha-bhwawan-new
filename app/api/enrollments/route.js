import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '../../lib/prisma';
import { successResponse, errorResponse, unauthorizedResponse } from '../../lib/apiResponse';

export async function POST(request){
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return errorResponse('Course ID is required');
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { 
        id: courseId,
        isPublished: true 
      }
    });

    if (!course) {
      return errorResponse('Course not found or not available', 404);
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (existingEnrollment) {
      if (existingEnrollment.status === 'REVOKED') {
        // Reactivate enrollment
        const enrollment = await prisma.enrollment.update({
          where: { id: existingEnrollment.id },
          data: { status: 'ACTIVE' }
        });
        return successResponse(enrollment);
      }
      return errorResponse('Already enrolled in this course');
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        status: 'ACTIVE'
      },
      include: {
        course: true
      }
    });

    return successResponse(enrollment, 201);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return errorResponse('Failed to enroll in course', 500);
  }
}