import type { PortableTextBlock } from "@portabletext/types";

import type { ArticleTable } from "@/components/article/article-table";
import type { ArticleFlowDiagram } from "@/components/article/flow-diagram";

export type SanityImage = {
  _type: "image";
  _key?: string;

  asset?: {
    _id?: string;
    _ref?: string;
    _type?: "reference";
    url?: string;

    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };

      lqip?: string;
    };
  };

  alt?: string;
  caption?: string;

  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type ArticleCodeBlock = {
  _key: string;
  _type: "code";
  code?: string;
  filename?: string;
  language?: string;
  highlightedLines?: number[];
};

export type ArticleCallout = {
  _key: string;
  _type: "callout";
  tone?: "insight" | "warning" | "tradeoff" | "decision";
  title?: string;
  content?: PortableTextBlock[];
};

export type ArticleBodyBlock =
  | PortableTextBlock
  | ArticleCodeBlock
  | ArticleCallout
  | ArticleFlowDiagram
  | ArticleTable
  | SanityImage;

export type ArticleCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  estimatedReadingMinutes?: number;
  featured?: boolean;
  tags?: string[];
  featuredImage?: SanityImage;
  category?: ArticleCategory;
};

export type ArticleDetail = Omit<ArticleSummary, "tags"> & {
  tags?: ArticleTag[];
  series?: ArticleSeries | null;
  body?: ArticleBodyBlock[];
  engineeringTakeaway?: string;
  seoTitle?: string;
  seoDescription?: string;
  relatedArticles?: ArticleSummary[];
};


export type ArticleTag = {
  _id: string;
  title: string;
  slug: string;
};

export type ArticleSeries = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type TopicSummary = BlogCategory & {
  articleCount: number;
  latestArticles?: ArticleSummary[];
};

export type TopicDetail = BlogCategory & {
  articles: ArticleSummary[];
};

export type HomepageData = {
  featuredArticle: ArticleSummary | null;
  recentArticles: ArticleSummary[];
  categories: BlogCategory[];
};

export type ArticleSitemapEntry = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  _updatedAt?: string;
};

export type TopicSitemapEntry = {
  slug: string;
  _updatedAt?: string;
};
