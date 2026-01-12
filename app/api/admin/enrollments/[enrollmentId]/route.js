import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../lib/apiResponse';

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
    const paramsAfter = await params;
    const body = await request.json();
    const { status } = body;

    if (!['ACTIVE', 'REVOKED'].includes(status)) {
      return errorResponse('Invalid status', 400);
    }

    const enrollment = await prisma.enrollment.update({
      where: { id: paramsAfter.enrollmentId },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        course: {
          select: {
            title: true
          }
        }
      }
    });

    return successResponse(enrollment);

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error updating enrollment:', error);
    return errorResponse('Failed to update enrollment', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const paramsAfter = await params;

    await prisma.enrollment.delete({
      where: { id: paramsAfter.enrollmentId }
    });

    return successResponse({ message: 'Enrollment deleted successfully' });

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error deleting enrollment:', error);
    return errorResponse('Failed to delete enrollment', 500);
  }
}