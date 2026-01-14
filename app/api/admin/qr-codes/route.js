import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '../../../lib/apiResponse';

export async function GET(request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const qrCodes = await prisma.qRCode.findMany({
      where,
      include: {
        _count: {
          select: {
            courses: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(qrCodes);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error fetching QR codes:', error);
    return errorResponse('Failed to fetch QR codes', 500);
  }
}

export async function POST(request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { name, upiId, qrImageUrl } = body;

    if (!name || !upiId || !qrImageUrl) {
      return errorResponse('Name, UPI ID, and QR image are required', 400);
    }

    const qrCode = await prisma.qRCode.create({
      data: {
        name,
        upiId,
        qrImageUrl,
        status: 'ACTIVE'
      }
    });

    return successResponse(qrCode);
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error creating QR code:', error);
    return errorResponse('Failed to create QR code', 500);
  }
}