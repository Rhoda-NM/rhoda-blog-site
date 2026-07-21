// src/sanity/schemaTypes/flowDiagram.ts

import { defineArrayMember, defineField, defineType } from "sanity";

export const flowDiagramType = defineType({
  name: "flowDiagram",
  title: "Flow Diagram",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional heading displayed above the diagram.",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "steps",
      title: "Steps",
      type: "array",

      of: [
        defineArrayMember({
          name: "flowStep",
          title: "Flow Step",
          type: "object",

          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description:
                "Optional supporting explanation displayed below the step.",
              validation: (rule) => rule.max(240),
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "description",
            },
          },
        }),
      ],

      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(12)
          .error("A flow diagram requires between 2 and 12 steps."),
    }),

    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional explanation displayed below the diagram.",
      validation: (rule) => rule.max(220),
    }),
  ],

  preview: {
    select: {
      title: "title",
      steps: "steps",
    },

    prepare({ title, steps }) {
      const count = Array.isArray(steps) ? steps.length : 0;

      return {
        title: title || "Flow diagram",
        subtitle: `${count} ${count === 1 ? "step" : "steps"}`,
      };
    },
  },
});