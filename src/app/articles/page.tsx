import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/home/article-card";
import { client } from "@/sanity/lib/client";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/types/article";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Engineering notes on system architecture, AI workflows, product engineering, automation, and technical strategy.",
};

async function getArticles(): Promise<ArticleSummary[]> {
  return client.fetch<ArticleSummary[]>(
    ARTICLES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["articles"],
      },
    },
  );
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <section className="technical-grid border-b border-border">
        <div className="site-shell py-12 sm:py-14 lg:py-16">
          <span className="technical-label">Article archive</span>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
            <h1 className="editorial-heading max-w-4xl text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.98]">
              Engineering ideas,
              <br />
              decisions and field notes
              <span className="text-burgundy-soft">.</span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:pb-1">
              Practical writing drawn from real systems, product
              constraints, architecture decisions, and lessons from
              implementation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="site-shell">
          <div className="flex items-center justify-between border-b border-border pb-7">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-brass">
                Published notes
              </span>

              <p className="mt-2 text-sm text-muted-foreground">
                {articles.length}{" "}
                {articles.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <Link
              href="/topics"
              className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy-soft hover:text-primary-hover"
            >
              Browse by topic
              <ArrowRight size={15} />
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.25rem] border border-border bg-surface p-10 text-center">
              <h2 className="text-2xl">No articles published yet.</h2>

              <p className="mt-3 text-muted-foreground">
                Publish your first article from Sanity Studio and it
                will appear here.
              </p>

              <Link
                href="/studio"
                className="button-primary mt-6"
              >
                Open Studio
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
