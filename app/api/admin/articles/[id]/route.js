import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

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

export async function GET(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("[ADMIN_ARTICLE_GET_ONE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return new NextResponse("Article not found", { status: 404 });
    }

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

    let finalSlug = existing.slug;
    if (customSlug && customSlug.trim() && customSlug.trim() !== existing.slug) {
      let baseSlug = slugify(customSlug);
      finalSlug = baseSlug;
      let count = 1;
      while (
        await prisma.article.findFirst({
          where: { slug: finalSlug, id: { not: id } },
        })
      ) {
        finalSlug = `${baseSlug}-${count}`;
        count++;
      }
    }

    const words = (content || existing.content).trim().split(/\s+/).length;
    const calculatedReadingTime = readingTimeMin ? Number(readingTimeMin) : Math.max(1, Math.ceil(words / 200));

    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: title ? title.trim() : existing.title,
        slug: finalSlug,
        excerpt: excerpt !== undefined ? excerpt?.trim() || null : existing.excerpt,
        content: content ? content.trim() : existing.content,
        coverImage: coverImage !== undefined ? coverImage || null : existing.coverImage,
        audioUrl: audioUrl !== undefined ? audioUrl || null : existing.audioUrl,
        audioDuration: audioDuration !== undefined ? (audioDuration ? Number(audioDuration) : null) : existing.audioDuration,
        category: category || existing.category,
        tags: tags !== undefined ? (Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(t => t.trim()).filter(Boolean) : []) : existing.tags,
        readingTimeMin: calculatedReadingTime,
        isPublished: isPublished !== undefined ? isPublished : existing.isPublished,
        authorName: authorName ? authorName.trim() : existing.authorName,
        authorAvatar: authorAvatar !== undefined ? authorAvatar || null : existing.authorAvatar,
        authorRole: authorRole !== undefined ? authorRole?.trim() || null : existing.authorRole,
        authorBio: authorBio !== undefined ? authorBio?.trim() || null : existing.authorBio,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[ADMIN_ARTICLE_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
    if (!user || user.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

    const params = await context.params;
    const { id } = params;

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("[ADMIN_ARTICLE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
