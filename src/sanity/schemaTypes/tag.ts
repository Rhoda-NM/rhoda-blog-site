// src/sanity/schemaTypes/tag.ts

import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(50),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 60,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Optional editorial definition explaining when this tag should be used.",
      validation: (rule) => rule.max(200),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});