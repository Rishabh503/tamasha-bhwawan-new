import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { requireAdmin, getCurrentUser } from '../../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../../lib/apiResponse';

export async function POST(request, { params }) {
  try {
    const admin = await getCurrentUser();
    await requireAdmin();
    const paramsAfter=await params
    const paymentRequest = await prisma.paymentRequest.findUnique({
      where: { id: paramsAfter.requestId },
      include: {
        user: true,
        course: true
      }
    });

    if (!paymentRequest) {
      return errorResponse('Payment request not found', 404);
    }

    if (paymentRequest.status !== 'PENDING') {
      return errorResponse('Payment request already processed');
    }

    // Use transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Update payment request status
      const updatedRequest = await tx.paymentRequest.update({
        where: { id: paramsAfter.requestId },
        data: {
          status: 'APPROVED',
          reviewedBy: admin.id,
          reviewedAt: new Date()
        }
      });

      // Check if enrollment already exists
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: paymentRequest.userId,
            courseId: paymentRequest.courseId
          }
        }
      });

      let enrollment;
      if (existingEnrollment) {
        // Reactivate if revoked
        enrollment = await tx.enrollment.update({
          where: { id: existingEnrollment.id },
          data: { status: 'ACTIVE' }
        });
      } else {
        // Create new enrollment
        enrollment = await tx.enrollment.create({
          data: {
            userId: paymentRequest.userId,
            courseId: paymentRequest.courseId,
            status: 'ACTIVE'
          }
        });
      }

      return { updatedRequest, enrollment };
    });

    return successResponse({
      message: 'Payment approved and student enrolled successfully',
      ...result
    });

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error approving payment:', error);
    return errorResponse('Failed to approve payment', 500);
  }
}