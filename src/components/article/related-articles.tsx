import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { formatArticleDate } from "@/lib/format-date";
import type { ArticleSummary } from "@/types/article";

export function RelatedArticles({
  articles,
}: {
  articles: ArticleSummary[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="article-related" aria-labelledby="related-title">
      <div className="article-ending-wide">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <span className="technical-label">Continue reading</span>
            <h2 id="related-title" className="mt-4 text-3xl sm:text-4xl">
              Related engineering notes
            </h2>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-semibold text-burgundy-soft sm:block"
          >
            View all articles
          </Link>
        </div>
        <div className="article-related-grid">
          {articles.slice(0, 3).map((article, index) => (
            <article key={article._id} className="article-related-card group">
              <div className="article-related-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                {article.category && (
                  <span className="technical-label">
                    {article.category.title}
                  </span>
                )}
                <h3 className="mt-4 text-2xl leading-tight">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="transition-colors group-hover:text-burgundy-soft"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {article.excerpt}
                </p>
              </div>
              <div className="article-related-meta">
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
                <Link
                  href={`/articles/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                >
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
