import type { Metadata } from "next";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Image } from "next-sanity/image";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ArticleFooter } from "@/components/article/article-footer";
import { PortableArticle } from "@/components/article/portable-article";
import { getArticleHeadings } from "@/components/article/article-headings";
import { TableOfContents } from "@/components/article/table-of-contents";
import { formatArticleDate } from "@/lib/format-date";
import { siteConfig } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { ArticleDetail } from "@/types/article";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type SlugResult = {
  slug: string;
};

export const dynamicParams = true;

const getArticle = cache(
  async (slug: string, preview = false): Promise<ArticleDetail | null> => {
    const token = process.env.SANITY_API_READ_TOKEN;
    const articleClient = preview && token
      ? client.withConfig({ token, useCdn: false, perspective: "drafts" })
      : client;

    return articleClient.fetch<ArticleDetail | null>(
      ARTICLE_BY_SLUG_QUERY,
      { slug },
      preview ? {} : {
        next: {
          revalidate: 60,
          tags: [`article:${slug}`, "articles"],
        },
      },
    );
  },
);

export async function generateStaticParams() {
  const articles = await client.fetch<SlugResult[]>(
    ARTICLE_SLUGS_QUERY,
  );

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;

  const socialImage = article.featuredImage?.asset
    ? urlFor(article.featuredImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: `/articles/${article.slug}`,
    },

    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: article.publishedAt,
      images: socialImage ? [socialImage] : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const article = await getArticle(slug, isDraftMode);

  if (!article) {
    notFound();
  }

  const readingTime = article.estimatedReadingMinutes ?? 6;
  const headings = getArticleHeadings(article.body);
  const canonicalUrl = `${siteConfig.url}/articles/${article.slug}`;
  const featuredImageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage).width(1600).auto("format").url()
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: canonicalUrl,
    image: featuredImageUrl ? [featuredImageUrl] : undefined,
    articleSection: article.category?.title,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.portfolioUrl,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <header className="technical-grid border-b border-border">
            <div className="site-shell py-7 sm:py-9 lg:py-10">
                <div className="mx-auto max-w-6xl">
                <Link
                    href="/articles"
                    className="
                    inline-flex items-center gap-2
                    text-sm font-semibold text-muted-foreground
                    transition-colors hover:text-foreground
                    "
                >
                    <ArrowLeft size={15} />
                    All articles
                </Link>

                <div className="mt-6 text-center">
                    {article.category && (
                    <Link
                        href={`/topics/${article.category.slug}`}
                        className="
                        font-mono text-[0.7rem] font-semibold uppercase
                        tracking-[0.12em] text-burgundy-soft
                        "
                    >
                        {article.category.title}
                    </Link>
                    )}

                    <h1
                    className="
                        editorial-heading mx-auto mt-4 max-w-[17ch]
                        text-[clamp(2.65rem,4.5vw,4.5rem)]
                        leading-[0.98] tracking-[-0.04em]
                    "
                    >
                    {article.title}
                    <span className="text-burgundy-soft">.</span>
                    </h1>

                    <p
                    className="
                        mx-auto mt-5 max-w-2xl
                        text-base leading-7 text-muted-foreground
                        sm:text-lg
                    "
                    >
                    {article.excerpt}
                    </p>

                    <div
                    className="
                        mt-5 flex flex-wrap items-center justify-center
                        gap-x-3 gap-y-2
                        font-mono text-[0.68rem] uppercase
                        tracking-[0.08em] text-faint-foreground
                    "
                    >
                    <span>
                      Published{" "}
                      <time dateTime={article.publishedAt}>
                        {formatArticleDate(article.publishedAt)}
                      </time>
                    </span>

                    {article.updatedAt && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>
                          Updated{" "}
                          <time dateTime={article.updatedAt}>
                            {formatArticleDate(article.updatedAt)}
                          </time>
                        </span>
                      </>
                    )}

                    <span aria-hidden="true">•</span>

                    <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {readingTime} min read
                    </span>

                    <span aria-hidden="true">•</span>

                    <span>Rhoda Muya</span>
                    </div>
                </div>
                </div>

                {article.featuredImage?.asset && (
                <div
                    className="
                    mx-auto mt-8 max-w-5xl overflow-hidden
                    rounded-[1.25rem] border border-border
                    bg-surface-muted
                    "
                >
                    <Image
                    src={urlFor(article.featuredImage)
                        .width(1600)
                        .height(900)
                        .fit("crop")
                        .auto("format")
                        .url()}
                    alt={article.featuredImage.alt ?? article.title}
                    width={1600}
                    height={900}
                    priority
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    className="h-auto w-full object-cover"
                    />
                </div>
                )}
            </div>
            </header>

        <div className="site-shell py-14 sm:py-20">
          <div className="article-layout">
            <div className="min-w-0">
              <PortableArticle article={article} />
            </div>

            {headings.length > 0 && (
              <aside className="article-toc-column">
                <TableOfContents headings={headings} />
              </aside>
            )}
          </div>
        </div>
        <ArticleFooter article={article} />
      </article>
    </main>
  );
}
