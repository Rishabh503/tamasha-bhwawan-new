import { siteConfig } from "../data/metaData";

export default function robots() {
  const baseUrl = siteConfig.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/admin/*",
          "/api/admin/",
          "/api/admin/*",
          "/onboarding/",
        ],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "PerplexityBot", "ChatGPT-User", "ClaudeBot", "Applebot"],
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
