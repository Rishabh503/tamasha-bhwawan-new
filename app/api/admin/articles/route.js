import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("[ADMIN_ARTICLES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      audioUrl,
      audioDuration,
      category,
      tags,
      readingTimeMin,
      isPublished,
      authorName,
      authorAvatar,
      authorRole,
      authorBio,
    } = body;

    if (!title || !title.trim()) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!content || !content.trim()) {
      return new NextResponse("Content is required", { status: 400 });
    }

    // Determine unique slug
    let baseSlug = customSlug?.trim() ? slugify(customSlug) : slugify(title);
    if (!baseSlug) baseSlug = "article-" + Date.now();
    let finalSlug = baseSlug;
    let count = 1;

    while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    // Auto-calculate reading time if not provided
    const words = content.trim().split(/\s+/).length;
    const calculatedReadingTime = readingTimeMin ? Number(readingTimeMin) : Math.max(1, Math.ceil(words / 200));

    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        coverImage: coverImage || null,
        audioUrl: audioUrl || null,
        audioDuration: audioDuration ? Number(audioDuration) : null,
        category: category || "Musicology",
        tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        readingTimeMin: calculatedReadingTime,
        isPublished: isPublished ?? true,
        authorName: authorName?.trim() || "Tamasha Bhawan Faculty",
        authorAvatar: authorAvatar || null,
        authorRole: authorRole?.trim() || "Maestro & Musicologist",
        authorBio: authorBio?.trim() || null,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("[ADMIN_ARTICLE_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
