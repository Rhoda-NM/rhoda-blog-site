import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { formatArticleDate } from "@/lib/format-date";
import type { ArticleSummary } from "@/types/article";

export function ArticleCard({
  article,
}: {
  article: ArticleSummary;
}) {
  const readingTime = article.estimatedReadingMinutes ?? 6;

  return (
    <article className="surface-card-interactive group flex min-h-[22rem] flex-col p-6 sm:p-7">
      {article.category && (
        <Link
          href={`/topics/${article.category.slug}`}
          className="
            font-mono text-[0.7rem] font-semibold uppercase
            tracking-[0.1em] text-burgundy-soft
          "
        >
          {article.category.title}
        </Link>
      )}

      <h3 className="mt-5 text-2xl leading-[1.18]">
        <Link
          href={`/articles/${article.slug}`}
          className="transition-colors group-hover:text-burgundy-soft"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {article.excerpt}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <div className="font-mono text-[0.68rem] uppercase tracking-[0.06em] text-faint-foreground">
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>

          <span className="mx-2" aria-hidden="true">
            •
          </span>

          <span>{readingTime} min read</span>
        </div>

        <Link
          href={`/articles/${article.slug}`}
          aria-label={`Read ${article.title}`}
          className="
            inline-flex size-9 shrink-0 items-center justify-center
            rounded-full border border-border text-burgundy-soft
            transition-all group-hover:border-burgundy-soft
            group-hover:bg-burgundy-muted
          "
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}