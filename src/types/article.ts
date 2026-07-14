export type SanityImage = {
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

export type ArticleCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  estimatedReadingMinutes?: number;
  featured?: boolean;
  tags?: string[];
  featuredImage?: SanityImage;
  category?: ArticleCategory;
};

export type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type HomepageData = {
  featuredArticle: ArticleSummary | null;
  recentArticles: ArticleSummary[];
  categories: BlogCategory[];
};