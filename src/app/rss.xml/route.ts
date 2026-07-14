import { siteConfig } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { ARTICLE_FEED_QUERY } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/types/article";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await client.fetch<ArticleSummary[]>(ARTICLE_FEED_QUERY);
  const items = articles
    .map((article) => {
      const url = `${siteConfig.url}/articles/${article.slug}`;
      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <description>${escapeXml(article.excerpt)}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
          ${article.category ? `<category>${escapeXml(article.category.title)}</category>` : ""}
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>Field notes on scalable systems, AI workflows, product engineering, and engineering for growth.</description>
        <language>en</language>
        <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
