import prisma from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth";
import { successResponse, errorResponse, unauthorizedResponse } from "../../../../../lib/apiResponse";

export async function POST(request, context) {
  try {
    await requireAdmin();

    const { params } = context;
    const { courseId } = await params; // ✅ FIX

    const body = await request.json();
    const { title, order } = body;

    if (!title) {
      return errorResponse("Title is required");
    }

    // Auto order handling
    let chapterOrder = order;
    if (chapterOrder === undefined) {
      const maxOrder = await prisma.chapter.findFirst({
        where: { courseId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      chapterOrder = maxOrder ? maxOrder.order + 1 : 1;
    }

    const chapter = await prisma.chapter.create({
      data: {
        title,
        order: chapterOrder,
        courseId, // ✅ now defined
      },
    });

    return successResponse(chapter, 201);
  } catch (error) {
    console.error("Error creating chapter:", error);

    if (error.message?.includes("Unauthorized")) {
      return unauthorizedResponse();
    }

    return errorResponse("Failed to create chapter", 500);
  }
}
