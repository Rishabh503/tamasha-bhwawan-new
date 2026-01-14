import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../../lib/apiResponse';

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;

    const body = await request.json();
    const { name, upiId, qrImageUrl, status } = body;

    const qrCode = await prisma.qRCode.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(upiId && { upiId }),
        ...(qrImageUrl && { qrImageUrl }),
        ...(status && { status })
      }
    });

    return successResponse(qrCode);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error updating QR code:', error);
    return errorResponse('Failed to update QR code', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Check if QR code is being used by any courses
    const coursesUsingQR = await prisma.course.count({
      where: { qrCodeId: id }
    });

    if (coursesUsingQR > 0) {
      return errorResponse(`Cannot delete QR code. It is being used by ${coursesUsingQR} course(s)`, 400);
    }

    await prisma.qRCode.delete({
      where: { id }
    });

    return successResponse({ message: 'QR code deleted successfully' });
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error deleting QR code:', error);
    return errorResponse('Failed to delete QR code', 500);
  }
}