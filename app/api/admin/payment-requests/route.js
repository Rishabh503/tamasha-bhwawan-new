import { errorResponse, successResponse, unauthorizedResponse } from '../../../lib/apiResponse';
import { getCurrentUser, requireAdmin } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

// export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status && status !== 'ALL' ? { status } : {};

    const paymentRequests = await prisma.paymentRequest.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
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
    });

    return successResponse(paymentRequests);

  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return unauthorizedResponse();
    }
    console.error('Error fetching payment requests:', error);
    return errorResponse('Failed to fetch payment requests', 500);
  }
}

export async function POST(request) {
  try {
    const { clerkUserId } = await getCurrentUser();
    if (!clerkUserId) {
      return unauthorizedResponse();
    }
 const user = await prisma.user.findFirst({
      where: { clerkUserId: clerkUserId }
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    const body = await request.json();
    const {
      courseId,
      studentName,
      studentEmail,
      studentPhone,
      transactionId,
      amount,
      paymentScreenshot
    } = body;
  console.log(courseId,studentName,studentEmail,studentEmail,amount,paymentScreenshot)
    // Validation
    if (!courseId || !studentName || !studentEmail || !studentEmail || !amount || !paymentScreenshot) {
      return errorResponse('Missing required fields', 400);
    }

  
    // Create payment request
    const paymentRequest = await prisma.paymentRequest.create({
      data: {
         userId: user.id,
        courseId,
        studentName,
        studentEmail,
        studentPhone,
        transactionId: transactionId || null,
        amount,
        paymentScreenshot,
        status: 'PENDING'
      }
    });

    return successResponse(paymentRequest);

  } catch (error) {
    console.error('Error creating payment request:', error);
    return errorResponse('Failed to create payment request', 500);
  }
}