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