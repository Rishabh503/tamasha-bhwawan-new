import prisma from "./lib/prisma";
import { siteConfig } from "../data/metaData";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = siteConfig.siteUrl;

  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/live-quiz/join`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];

  // Dynamic Article routes from database
  try {
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });

    const articleUrls = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt || article.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...routes, ...articleUrls];
  } catch (error) {
    console.error("[SITEMAP_GEN_ERROR]", error);
    return routes;
  }
}
