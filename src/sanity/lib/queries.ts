import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
  {
    "featuredArticle": *[
      _type == "article"
      && defined(slug.current)
      && featured == true
      && defined(publishedAt)
    ]
    | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      updatedAt,
      estimatedReadingMinutes,
      tags,
      featuredImage {
        ...,
        asset->
      },
      category-> {
        _id,
        title,
        "slug": slug.current
      }
    },

    "recentArticles": *[
      _type == "article"
      && defined(slug.current)
      && defined(publishedAt)
    ]
    | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      updatedAt,
      estimatedReadingMinutes,
      featured,
      featuredImage {
        ...,
        asset->
      },
      category-> {
        _id,
        title,
        "slug": slug.current
      }
    },

    "categories": *[
      _type == "category"
      && defined(slug.current)
    ]
    | order(title asc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      description
    }
  }
`);

export const ARTICLES_QUERY = defineQuery(`
  *[
    _type == "article"
    && defined(slug.current)
    && defined(publishedAt)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    estimatedReadingMinutes,
    featured,
    tags,

    featuredImage {
      ...,
      asset->
    },

    category-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "article"
    && slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    estimatedReadingMinutes,
    featured,
    tags,
    engineeringTakeaway,
    seoTitle,
    seoDescription,

    featuredImage {
      ...,
      asset->
    },

    category-> {
      _id,
      title,
      "slug": slug.current,
      description
    },

    body[] {
      ...,

      _type == "image" => {
        ...,
        asset->
      }
    },

    "relatedArticles": *[
      _type == "article"
      && defined(slug.current)
      && defined(publishedAt)
      && _id != ^._id
    ] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      estimatedReadingMinutes,
      tags,
      "sameCategory": category._ref == ^.category._ref,
      "sharedTagCount": count(tags[@ in ^.^.tags]),

      featuredImage {
        ...,
        asset->
      },

      category-> {
        _id,
        title,
        "slug": slug.current
      }
    }
    | order(sameCategory desc, sharedTagCount desc, publishedAt desc)[0...3]
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[
    _type == "article"
    && defined(slug.current)
  ] {
    "slug": slug.current
  }
`);

export const ARTICLE_FEED_QUERY = defineQuery(`
  *[
    _type == "article"
    && defined(slug.current)
    && defined(publishedAt)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    updatedAt,
    "_updatedAt": _updatedAt,
    tags,
    category-> {
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const TOPICS_QUERY = `
  *[
    _type == "category" &&
    isVisible == true
  ] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    introduction,
    iconKey,
    isFeatured,
    seoTitle,
    seoDescription,

    "articleCount": count(
      *[
        _type == "article" &&
        defined(publishedAt) &&
        references(^._id)
      ]
    ),

    "latestArticles": *[
      _type == "article" &&
      defined(publishedAt) &&
      references(^._id)
    ] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }
  }
`;

export const TOPIC_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "category"
    && slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    description,

    "articles": *[
      _type == "article"
      && defined(slug.current)
      && defined(publishedAt)
      && category._ref == ^._id
    ]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      estimatedReadingMinutes,
      featured,
      tags,

      featuredImage {
        ...,
        asset->
      },

      category-> {
        _id,
        title,
        "slug": slug.current
      }
    }
  }
`);

export const TOPIC_SLUGS_QUERY = defineQuery(`
  *[
    _type == "category"
    && defined(slug.current)
  ] {
    "slug": slug.current
  }
`);

export const TOPIC_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "category"
    && defined(slug.current)
  ] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`);
