// This file is used to generate the sitemap for the website. It fetches the list of articles from Sanity and combines them with static routes to create a complete sitemap.
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import {
  ARTICLE_FEED_QUERY,
  TOPIC_SITEMAP_QUERY,
} from "@/sanity/lib/queries";
import type {
  ArticleSitemapEntry,
  TopicSitemapEntry,
} from "@/types/article";

const baseUrl = siteConfig.url.replace(/\/$/, "");

const staticRoutes = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/articles",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/topics",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/about",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    path: "/uses",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] satisfies Array<{
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}>;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, topics] = await Promise.all([
    client.fetch<ArticleSitemapEntry[]>(
      ARTICLE_FEED_QUERY,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ["articles", "sitemap"],
        },
      },
    ),

    client.fetch<TopicSitemapEntry[]>(
      TOPIC_SITEMAP_QUERY,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ["categories", "sitemap"],
        },
      },
    ),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      changeFrequency,
      priority,
    }),
  );

  const articleEntries: MetadataRoute.Sitemap = articles.map(
    (article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified:
        article.updatedAt ??
        article._updatedAt ??
        article.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const topicEntries: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${baseUrl}/topics/${topic.slug}`,
    lastModified: topic._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...topicEntries];
}
