import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { requireAdmin, getCurrentUser } from '../../../../..//lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../..//lib/apiResponse';

export async function POST(request, { params }) {
  try {
    const admin = await getCurrentUser();
    await requireAdmin();
   const paramsAfter=await params;
    const body = await request.json();
    const { reason } = body;

    if (!reason || !reason.trim()) {
      return errorResponse('Rejection reason is required');
    }

    const paymentRequest = await prisma.paymentRequest.findUnique({
      where: { id: paramsAfter.requestId }
    });

    if (!paymentRequest) {
      return errorResponse('Payment request not found', 404);
    }

    if (paymentRequest.status !== 'PENDING') {
      return errorResponse('Payment request already processed');
    }

    const updatedRequest = await prisma.paymentRequest.update({
      where: { id: paramsAfter.requestId },
      data: {
        status: 'REJECTED',
        reviewedBy: admin.id,
        reviewedAt: new Date(),
        rejectionReason: reason
      }
    });

    return successResponse({
      message: 'Payment request rejected',
      paymentRequest: updatedRequest
    });

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error rejecting payment:', error);
    return errorResponse('Failed to reject payment', 500);
  }
}