import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../lib/apiResponse';

export async function GET() {
  try {
    await requireAdmin();

    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            chapters: true,
            enrollments: true,
            price:true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(courses);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error fetching courses:', error);
    return errorResponse('Failed to fetch courses', 500);
  }
}

export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { title, description, imageUrl } = body;

    if (!title) {
      return errorResponse('Title is required');
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        isPublished: false
      }
    });

    return successResponse(course, 201);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error creating course:', error);
    return errorResponse('Failed to create course', 500);
  }
}