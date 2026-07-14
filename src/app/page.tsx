import {
  ArrowRight,
  Bot,
  Boxes,
  Braces,
  Cog,
  Target,
} from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/home/article-card";
import { FeaturedArticle } from "@/components/home/featured-article";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import type {
  ArticleSummary,
  BlogCategory,
  HomepageData,
} from "@/types/article";

const fallbackFeaturedArticle: ArticleSummary = {
  _id: "fallback-featured",
  title: "Role-Based Access Control Is a Data-Modelling Problem",
  slug: "role-based-access-control-is-a-data-modelling-problem",
  excerpt:
    "Why authorization failures often begin in the data model—and how to design permissions that remain clear as a product grows.",
  publishedAt: "2026-07-14T08:00:00.000Z",
  estimatedReadingMinutes: 8,
  featured: true,
  category: {
    _id: "fallback-system-architecture",
    title: "System Architecture",
    slug: "system-architecture",
  },
};

const fallbackArticles: ArticleSummary[] = [
  {
    _id: "fallback-1",
    title:
      "Why Workspace Isolation Is Harder Than Adding an Organization ID",
    slug: "workspace-isolation-beyond-organization-id",
    excerpt:
      "A practical look at data boundaries, scoped queries, and the subtle ways multi-tenant systems leak information.",
    publishedAt: "2026-07-10T08:00:00.000Z",
    estimatedReadingMinutes: 7,
    category: {
      _id: "fallback-product-engineering",
      title: "Product Engineering",
      slug: "product-engineering",
    },
  },
  {
    _id: "fallback-2",
    title:
      "Designing a Quick Add Workflow That Is Faster Than a Sticky Note",
    slug: "designing-a-quick-add-workflow",
    excerpt:
      "How reducing capture friction can turn an operations platform into the real source of truth for a growing business.",
    publishedAt: "2026-07-06T08:00:00.000Z",
    estimatedReadingMinutes: 6,
    category: {
      _id: "fallback-automation",
      title: "Automation",
      slug: "automation",
    },
  },
  {
    _id: "fallback-3",
    title: "Persistent Memory in AI Applications",
    slug: "persistent-memory-in-ai-applications",
    excerpt:
      "What should be stored, what should be retrieved, and when memory becomes an architectural liability.",
    publishedAt: "2026-07-01T08:00:00.000Z",
    estimatedReadingMinutes: 9,
    category: {
      _id: "fallback-ai-workflows",
      title: "AI Workflows",
      slug: "ai-workflows",
    },
  },
];

const fallbackCategories: BlogCategory[] = [
  {
    _id: "category-1",
    title: "System Architecture",
    slug: "system-architecture",
  },
  {
    _id: "category-2",
    title: "AI Workflows",
    slug: "ai-workflows",
  },
  {
    _id: "category-3",
    title: "Product Engineering",
    slug: "product-engineering",
  },
  {
    _id: "category-4",
    title: "Automation",
    slug: "automation",
  },
  {
    _id: "category-5",
    title: "Technical Strategy",
    slug: "technical-strategy",
  },
];

const topicIcons = {
  "system-architecture": Boxes,
  "ai-workflows": Bot,
  "product-engineering": Braces,
  automation: Cog,
  "technical-strategy": Target,
};

async function getHomepageData(): Promise<HomepageData> {
  return client.fetch<HomepageData>(
    HOMEPAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["homepage", "articles", "categories"],
      },
    },
  );
}

export default async function HomePage() {
  const data = await getHomepageData();

  const featuredArticle =
    data.featuredArticle ??
    data.recentArticles?.[0] ??
    fallbackFeaturedArticle;

  const recentArticles =
    data.recentArticles
      ?.filter((article) => article._id !== featuredArticle._id)
      .slice(0, 3) ?? [];

  const displayedArticles =
    recentArticles.length > 0 ? recentArticles : fallbackArticles;

  const categories =
    data.categories?.length > 0
      ? data.categories
      : fallbackCategories;

  return (
    <main>
      <section className="technical-grid overflow-hidden border-b border-border">
        <div
          className="
            site-shell grid gap-10 py-12
            lg:grid-cols-[0.95fr_1.05fr]
            lg:items-center lg:py-14
          "
        >
          <div className="max-w-3xl">
            <span className="technical-label">
              Engineering notes
            </span>

            <h1
              className="
                editorial-heading mt-6
                text-[clamp(3rem,4.2vw,5rem)]
                leading-[0.98] text-foreground
              "
            >
              <span className="block">Field Notes on</span>
              <span className="block">Scalable Systems,</span>
              <span className="block">AI Workflows, and</span>
              <span className="block">
                Engineering for Growth
                <span className="text-burgundy-soft">.</span>
              </span>
            </h1>

           <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Practical essays, system breakdowns, and technical decisions
              extracted from real product and infrastructure work.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="#recent-articles"
                className="button-primary"
              >
                Start reading
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <Link
                href="/topics"
                className="
                  inline-flex items-center gap-2 text-sm
                  font-semibold text-burgundy-soft
                  transition-colors hover:text-primary-hover
                "
              >
                Browse topics
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <FeaturedArticle article={featuredArticle} />
        </div>
      </section>

      <section className="border-b border-border">
        <div
          className="
            site-shell flex flex-col gap-6 py-7
            xl:flex-row xl:items-center xl:justify-between
          "
        >
          <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-brass">
            Explore topics
          </span>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon =
                topicIcons[
                  category.slug as keyof typeof topicIcons
                ] ?? Braces;

              return (
                <Link
                  key={category._id}
                  href={`/topics/${category.slug}`}
                  className="
                    inline-flex min-h-10 items-center gap-2 rounded-full
                    border border-border bg-surface px-4
                    text-sm font-medium text-foreground-soft
                    transition-all hover:-translate-y-0.5
                    hover:border-burgundy-soft
                    hover:bg-burgundy-muted hover:text-foreground
                  "
                >
                  <Icon
                    size={15}
                    className="text-burgundy-soft"
                    aria-hidden="true"
                  />

                  {category.title}
                </Link>
              );
            })}
          </div>

          <Link
            href="/topics"
            className="
              inline-flex shrink-0 items-center gap-2
              text-sm font-semibold text-brass
              transition-colors hover:text-brass-soft
            "
          >
            View all topics
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        id="recent-articles"
        className="section-spacing scroll-mt-24"
      >
        <div className="site-shell">
          <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="technical-label">
                Recent articles
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl">
                Latest engineering notes
              </h2>
            </div>

            <Link
              href="/articles"
              className="
                inline-flex items-center gap-2 text-sm
                font-semibold text-burgundy-soft
                transition-colors hover:text-primary-hover
              "
            >
              View all articles
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {displayedArticles.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}