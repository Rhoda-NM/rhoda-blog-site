// This file is used to generate the sitemap for the website. It fetches the list of articles from Sanity and combines them with static routes to create a complete sitemap.
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { ARTICLE_FEED_QUERY } from "@/sanity/lib/queries";
import type { ArticleSitemapEntry } from "@/types/article";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await client.fetch<ArticleSitemapEntry[]>(
    ARTICLE_FEED_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["articles", "sitemap"] } },
  );
  const staticRoutes = ["", "/articles", "/topics", "/about", "/uses", "/privacy"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/articles" ? 0.9 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteConfig.url}/articles/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
