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
        <header className="article-hero technical-grid">
          <div className="site-shell">
            <div className="article-hero-inner">
              <Link href="/articles" className="article-back-link">
                <ArrowLeft size={15} />
                All articles
              </Link>

              <div className="article-hero-tags" aria-label="Article topics">
                {article.category && (
                  <Link
                    href={`/topics/${article.category.slug}`}
                    className="article-topic-pill article-topic-pill-primary"
                  >
                    {article.category.title}
                  </Link>
                )}
                {article.tags?.map((tag) => (
                  <span key={tag._id} className="article-topic-pill">
                    {tag.title}
                  </span>
                ))}
              </div>

              <div className="article-hero-grid">
                <h1 className="article-hero-title editorial-heading">
                  {article.title}
                  <span className="text-burgundy-soft">.</span>
                </h1>

                <div className="article-hero-summary">
                  <p className="article-hero-excerpt">{article.excerpt}</p>

                  <dl className="article-hero-meta">
                    <div>
                      <dt>Published</dt>
                      <dd>
                        <time dateTime={article.publishedAt}>
                          {formatArticleDate(article.publishedAt)}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt>Reading time</dt>
                      <dd className="inline-flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {readingTime} min
                      </dd>
                    </div>
                    <div>
                      <dt>Written by</dt>
                      <dd>Rhoda Muya</dd>
                    </div>
                    {article.updatedAt && (
                      <div>
                        <dt>Updated</dt>
                        <dd>
                          <time dateTime={article.updatedAt}>
                            {formatArticleDate(article.updatedAt)}
                          </time>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {article.featuredImage?.asset && (
                <div className="article-hero-image">
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
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="site-shell py-12 sm:py-16 lg:py-20">
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
