import prisma from "../../../lib/prisma";

export async function GET(request, context) {
  try {
    const { params } = context;
    const { courseId } = await params;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isPublished: true,
        chapters: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            order: true,
            videos: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                description: true,
                youtubeUrl: true,
                order: true,
                notes: {
                  select: {
                    id: true,
                    content: true,
                    pdfUrl: true,
                  },
                },
                pyqs: {
                  select: {
                    id: true,
                    question: true,
                    options: true,
                    correctIndex: true,
                    solution: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return Response.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    return Response.json(
      { success: false, message: "Failed to fetch course details" },
      { status: 500 }
    );
  }
}
