import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Cog,
  Target,
} from "lucide-react";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { TOPICS_QUERY } from "@/sanity/lib/queries";
import type { TopicSummary } from "@/types/article";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse engineering notes by system architecture, AI workflows, product engineering, automation, and technical strategy.",
};

const topicIcons = {
  "system-architecture": Boxes,
  "ai-workflows": Bot,
  "product-engineering": Braces,
  automation: Cog,
  "technical-strategy": Target,
};

async function getTopics(): Promise<TopicSummary[]> {
  return client.fetch<TopicSummary[]>(
    TOPICS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["categories", "articles"],
      },
    },
  );
}

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <main>
      <section className="technical-grid border-b border-border">
        <div className="site-shell py-16 sm:py-20">
          <span className="technical-label">Knowledge map</span>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <h1 className="editorial-heading max-w-4xl text-[clamp(3.5rem,7vw,7rem)] leading-[0.95]">
              Explore the systems behind the software
              <span className="text-burgundy-soft">.</span>
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:pb-2">
              Browse practical thinking across architecture, product
              engineering, AI systems, automation, and technical
              decision-making.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-shell">
          {topics.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {topics.map((topic) => {
                const Icon =
                  topicIcons[
                    topic.slug as keyof typeof topicIcons
                  ] ?? Braces;

                return (
                  <article
                    key={topic._id}
                    className="surface-card-interactive group flex min-h-[25rem] flex-col p-7"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface-muted text-burgundy-soft">
                        <Icon size={20} />
                      </div>

                      <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint-foreground">
                        {topic.articleCount}{" "}
                        {topic.articleCount === 1
                          ? "article"
                          : "articles"}
                      </span>
                    </div>

                    <h2 className="mt-7 text-3xl">
                      <Link
                        href={`/topics/${topic.slug}`}
                        className="transition-colors group-hover:text-burgundy-soft"
                      >
                        {topic.title}
                      </Link>
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      {topic.description ??
                        "Technical essays, implementation decisions, and practical lessons from this area of engineering."}
                    </p>

                    {topic.latestArticles &&
                      topic.latestArticles.length > 0 && (
                        <div className="mt-7 space-y-3 border-t border-border pt-6">
                          {topic.latestArticles.map((article) => (
                            <Link
                              key={article._id}
                              href={`/articles/${article.slug}`}
                              className="block text-sm leading-6 text-foreground-soft transition-colors hover:text-burgundy-soft"
                            >
                              {article.title}
                            </Link>
                          ))}
                        </div>
                      )}

                    <Link
                      href={`/topics/${topic.slug}`}
                      className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-burgundy-soft"
                    >
                      Explore topic
                      <ArrowRight size={15} />
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.25rem] border border-border bg-surface p-10 text-center">
              <h2 className="text-2xl">No topics published yet.</h2>

              <p className="mt-3 text-muted-foreground">
                Create and publish categories inside Sanity Studio.
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