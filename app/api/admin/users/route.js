import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../lib/apiResponse';

// export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await requireAdmin();

    const users = await prisma.user.findMany({
      include: {
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                price: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            enrollments: true,
            paymentRequests: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(users);

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error fetching users:', error);
    return errorResponse('Failed to fetch users', 500);
  }
}