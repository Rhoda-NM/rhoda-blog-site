import type { SanityImageSource } from "@sanity/image-url";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Image } from "next-sanity/image";

import { ArchitectureGraphic } from "./architecture-graphic";

import { formatArticleDate } from "@/lib/format-date";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleSummary } from "@/types/article";

export function FeaturedArticle({
  article,
}: {
  article: ArticleSummary;
}) {
  const readingTime = article.estimatedReadingMinutes ?? 6;
  const hasImage = Boolean(article.featuredImage?.asset);

  return (
    <article className="surface-card overflow-hidden p-3 sm:p-4">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-between px-3 py-3 sm:px-5 sm:py-5">
          <div>
            <span className="technical-label">Featured article</span>

            <h2 className="mt-6 text-3xl sm:text-[2.15rem] lg:text-[2.25rem]">
              <Link
                href={`/articles/${article.slug}`}
                className="transition-colors hover:text-burgundy-soft"
              >
                {article.title}
              </Link>
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
              {article.category && (
                <Link
                  href={`/topics/${article.category.slug}`}
                  className="text-brass transition-colors hover:text-brass-soft"
                >
                  {article.category.title}
                </Link>
              )}

              <span aria-hidden="true">•</span>

              <time dateTime={article.publishedAt}>
                {formatArticleDate(article.publishedAt)}
              </time>

              <span aria-hidden="true">•</span>

              <span>{readingTime} min read</span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              {article.excerpt}
            </p>
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="
              mt-8 inline-flex items-center gap-2 self-start
              text-sm font-semibold text-burgundy-soft
              transition-colors hover:text-primary-hover
            "
          >
            Read article
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {hasImage ? (
          <div className="relative min-h-[19rem] overflow-hidden rounded-[1.1rem] bg-surface-muted">
            <Image
              src={urlFor(
                article.featuredImage as SanityImageSource,
              )
                .width(1200)
                .height(900)
                .fit("crop")
                .url()}
              alt={article.featuredImage?.alt ?? article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        ) : (
          <ArchitectureGraphic />
        )}
      </div>
    </article>
  );
}