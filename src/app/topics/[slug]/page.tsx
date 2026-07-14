import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ArticleCard } from "@/components/home/article-card";
import { client } from "@/sanity/lib/client";
import {
  TOPIC_BY_SLUG_QUERY,
  TOPIC_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { TopicDetail } from "@/types/article";

type TopicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SlugResult = {
  slug: string;
};

export const dynamicParams = true;

const getTopic = cache(
  async (slug: string): Promise<TopicDetail | null> => {
    return client.fetch<TopicDetail | null>(
      TOPIC_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          revalidate: 60,
          tags: [`topic:${slug}`, "categories", "articles"],
        },
      },
    );
  },
);

export async function generateStaticParams() {
  const topics = await client.fetch<SlugResult[]>(
    TOPIC_SLUGS_QUERY,
  );

  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    return {
      title: "Topic not found",
    };
  }

  const description =
    topic.description ??
    `Engineering notes and technical essays about ${topic.title}.`;

  return {
    title: topic.title,
    description,

    alternates: {
      canonical: `/topics/${topic.slug}`,
    },

    openGraph: {
      title: topic.title,
      description,
      type: "website",
    },
  };
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) {
    notFound();
  }

  return (
    <main>
      <section className="technical-grid border-b border-border">
        <div className="site-shell py-14 sm:py-20">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All topics
          </Link>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <span className="technical-label">
                Engineering topic
              </span>

              <h1 className="editorial-heading mt-6 text-[clamp(3.7rem,7vw,7.5rem)] leading-[0.94]">
                {topic.title}
                <span className="text-burgundy-soft">.</span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="text-lg leading-8 text-muted-foreground">
                {topic.description ??
                  `Technical essays and practical engineering notes about ${topic.title}.`}
              </p>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-brass">
                {topic.articles.length}{" "}
                {topic.articles.length === 1
                  ? "published article"
                  : "published articles"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-shell">
          {topic.articles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {topic.articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.25rem] border border-border bg-surface p-10 text-center">
              <h2 className="text-2xl">
                No articles in this topic yet.
              </h2>

              <p className="mt-3 text-muted-foreground">
                Assign this category to an article in Sanity Studio,
                then publish the article.
              </p>

              <Link
                href="/studio"
                className="button-primary mt-6"
              >
                Create an article
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}