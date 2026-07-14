import Link from "next/link";

import { ArticleCard } from "@/components/home/article-card";
import type { ArticleSummary } from "@/types/article";

export function RelatedArticles({
  articles,
}: {
  articles: ArticleSummary[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="article-ending-wide" aria-labelledby="related-title">
      <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <span className="technical-label">Continue reading</span>
          <h2 id="related-title" className="mt-4 text-3xl sm:text-4xl">
            Related engineering notes
          </h2>
        </div>
        <Link href="/articles" className="hidden text-sm font-semibold text-burgundy-soft sm:block">
          View all articles
        </Link>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
