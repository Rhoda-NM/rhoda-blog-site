import { defineArrayMember, defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "publishing",
      title: "Publishing",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(10).max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "publishing",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "articleFormat",
      title: "Article Format",
      type: "string",
      group: "content",

      options: {
        layout: "radio",
        list: [
          {
            title: "Technical Deep Dive",
            value: "technical-deep-dive",
          },
          {
            title: "Architecture Note",
            value: "architecture-note",
          },
          {
            title: "Project Case Study",
            value: "project-case-study",
          },
          {
            title: "Engineering Guide",
            value: "engineering-guide",
          },
          {
            title: "Technical Strategy",
            value: "technical-strategy",
          },
        ],
      },

      initialValue: "technical-deep-dive",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "series",
      title: "Series",
      description:
        "Optional collection this article belongs to, such as Building WebStream.",
      type: "reference",
      group: "content",
      to: [{ type: "series" }],
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "A concise summary used on article cards and search results.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(60).max(220),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      description:
        "Choose specific technologies, patterns, or concepts covered by the article.",
      type: "array",
      group: "content",

      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
          options: {
            disableNew: true,
          },
        }),
      ],

      validation: (rule) => rule.required().unique().min(2).max(6),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "content",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (rule) => rule.required().min(10).max(180),
        }),

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          validation: (rule) => rule.max(220),
        }),
      ],

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Inline Code", value: "code" },
            ],

            annotations: [
              {
                name: "internalLink",
                title: "Internal Article Link",
                type: "object",

                fields: [
                  {
                    name: "reference",
                    title: "Article",
                    type: "reference",
                    to: [{ type: "article" }],
                    validation: (rule) => rule.required(),
                  },
                ],
              },
              {
                name: "link",
                title: "External Link",
                type: "object",

                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({
                          scheme: ["http", "https", "mailto"],
                        }),
                  },
                  {
                    name: "openInNewTab",
                    title: "Open in New Tab",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: "flowDiagram",
        }),

        defineArrayMember({
          type: "code",
          title: "Code Block",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "TSX", value: "tsx" },
              { title: "JSON", value: "json" },
              { title: "SQL", value: "sql" },
              { title: "Bash", value: "bash" },
              { title: "Python", value: "python" },
              { title: "Go", value: "go" },
              { title: "Prisma", value: "prisma" },
            ],
            withFilename: true,
          },
        }),

        defineArrayMember({
          name: "callout",
          title: "Callout",
          type: "object",
          fields: [
            defineField({
              name: "tone",
              title: "Callout type",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Engineering insight", value: "insight" },
                  { title: "Warning", value: "warning" },
                  { title: "Trade-off", value: "tradeoff" },
                  {
                    title: "Architecture decision",
                    value: "decision",
                  },
                ],
              },
              initialValue: "insight",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description:
                "Optional. The callout type is used when no title is provided.",
              validation: (rule) => rule.max(100),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bullet List", value: "bullet" },
                    { title: "Numbered List", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                      { title: "Inline Code", value: "code" },
                    ],
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: "title",
              tone: "tone",
            },
            prepare({ title, tone }) {
              const labels: Record<string, string> = {
                insight: "Engineering insight",
                warning: "Warning",
                tradeoff: "Trade-off",
                decision: "Architecture decision",
              };

              return {
                title: title || labels[tone] || "Callout",
                subtitle: labels[tone] || "Callout",
              };
            },
          },
        }),
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "engineeringTakeaway",
      title: "Engineering Takeaway",
      description:
        "A concise principle or lesson shown near the end of the article.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(300),
    }),

    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      description:
        "Select up to three articles readers should explore next.",
      type: "array",
      group: "content",

      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],

      validation: (rule) => rule.unique().max(3),
    }),
    
    defineField({
      name: "publishedAt",
      title: "Published At",
      description:
        "Set this to the date and time the article is first made publicly available.",
      type: "datetime",
      group: "publishing",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
      group: "publishing",
      description:
        "Set this when a published article receives a meaningful revision.",
      validation: (rule) =>
        rule.custom((updatedAt, context) => {
          const publishedAt = (context.document as { publishedAt?: string })
            ?.publishedAt;

          if (
            updatedAt &&
            publishedAt &&
            new Date(updatedAt) < new Date(publishedAt)
          ) {
            return "Last updated cannot be earlier than the publication date.";
          }

          return true;
        }),
    }),

    defineField({
      name: "featured",
      title: "Featured Article",
      description: "Show this article prominently on the homepage.",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),

    defineField({
      name: "estimatedReadingMinutes",
      title: "Estimated Reading Time",
      type: "number",
      group: "publishing",
      description: "Estimated reading time in minutes.",
      validation: (rule) => rule.integer().positive().max(120),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Optional alternative title for search results.",
      validation: (rule) => rule.max(65),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description:
        "Only set this when another URL should be treated as the original version of the article.",
      type: "url",
      group: "seo",

      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    
  ],

  orderings: [
    {
      title: "Publication Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "featuredImage",
      publishedAt: "publishedAt",
    },

    prepare({ title, category, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "Unpublished";

      return {
        title,
        subtitle: [category, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
