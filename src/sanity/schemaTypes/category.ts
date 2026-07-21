// src/sanity/schemaTypes/category.ts
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "editorial",
      title: "Editorial guidance",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "display",
      title: "Display",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().min(2).max(60),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 80,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Card description",
      description:
        "A concise summary displayed on topic cards and topic listings.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(180),
    }),

    defineField({
      name: "introduction",
      title: "Topic page introduction",
      description:
        "Unique introductory copy displayed at the top of the topic page.",
      type: "text",
      rows: 6,
      group: "content",
      validation: (rule) => rule.required().min(100).max(700),
    }),

    defineField({
      name: "editorialScope",
      title: "Editorial scope",
      description:
        "Internal guidance explaining what belongs in this category and what should be placed elsewhere.",
      type: "text",
      rows: 7,
      group: "editorial",
      validation: (rule) => rule.required().max(1200),
    }),

    defineField({
      name: "focusKeyword",
      title: "Primary search topic",
      description:
        "Used for editorial planning. Do not output this as a meta-keywords tag.",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(80),
    }),

    defineField({
      name: "relatedKeywords",
      title: "Related search topics",
      description:
        "Supporting terms that writers may address naturally in relevant content.",
      type: "array",
      group: "seo",
      of: [
        {
          type: "string",
        },
      ],
      validation: (rule) => rule.max(10).unique(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO title",
      description:
        "A descriptive title for search results and social sharing.",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO description",
      description:
        "A concise summary describing what readers will find on this topic page.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(170),
    }),

    defineField({
      name: "iconKey",
      title: "Icon",
      type: "string",
      group: "display",
      options: {
        list: [
          { title: "Network", value: "network" },
          { title: "Code braces", value: "braces" },
          { title: "AI bot", value: "bot" },
          { title: "Workflow", value: "workflow" },
          { title: "Target", value: "target" },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "display",
      validation: (rule) =>
        rule.required().integer().min(1).max(20),
    }),

    defineField({
      name: "isVisible",
      title: "Show on website",
      description:
        "Keep disabled until the category contains published articles.",
      type: "boolean",
      group: "display",
      initialValue: false,
    }),

    defineField({
      name: "isFeatured",
      title: "Feature this topic",
      description:
        "Allows selected topics to receive stronger placement on the homepage.",
      type: "boolean",
      group: "display",
      initialValue: false,
    }),
  ],

  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      description: "description",
      isVisible: "isVisible",
    },

    prepare({ title, description, isVisible }) {
      return {
        title,
        subtitle: `${isVisible ? "Visible" : "Hidden"} · ${
          description ?? "No description"
        }`,
      };
    },
  },
});