

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../lib/apiResponse';

export async function GET() {
  try {
    const { userId } =await auth();
    
    if (!userId) {
      return unauthorizedResponse();
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        enrollments: {
          where: {
            status: 'ACTIVE'
          },
          include: {
            course: {
              include: {
                _count: {
                  select: {
                    chapters: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user.enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return errorResponse('Failed to fetch enrollments', 500);
  }
}