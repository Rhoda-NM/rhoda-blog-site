// src/sanity/schemaTypes/series.ts

import { defineField, defineType } from "sanity";

export const seriesType = defineType({
  name: "series",
  title: "Article Series",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(300),
    }),
  ],
});