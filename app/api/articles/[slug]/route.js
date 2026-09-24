import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { slug } = params;

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    // Increment views asynchronously
    try {
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      });
    } catch (e) {
      console.warn("View increment failed non-critically", e);
    }

    // Fetch related articles
    const related = await prisma.article.findMany({
      where: {
        isPublished: true,
        id: { not: article.id },
        OR: [
          { category: article.category },
          { tags: { hasSome: article.tags } }
        ]
      },
      take: 4,
      orderBy: { views: "desc" },
    });

    return NextResponse.json({ article, related });
  } catch (error) {
    console.error("[ARTICLE_SLUG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
