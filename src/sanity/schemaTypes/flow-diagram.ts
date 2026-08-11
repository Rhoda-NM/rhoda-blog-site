import { defineArrayMember, defineField, defineType } from "sanity";

const stepFields = [
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
    validation: (rule) => rule.max(220),
  }),
  defineField({
    name: "connectorLabel",
    title: "Transition to next item",
    description:
      'Optional text shown beside the arrow, such as "30 seconds + jitter".',
    type: "string",
    validation: (rule) => rule.max(100),
  }),
];

export const nestedFlowStepType = defineType({
  name: "flowDecisionStep",
  title: "Step",
  type: "object",
  fields: stepFields,
  preview: {
    select: { title: "label", subtitle: "connectorLabel" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled step",
        subtitle: subtitle ? `Then: ${subtitle}` : "Step",
      };
    },
  },
});

export const flowDecisionType = defineType({
  name: "flowDecision",
  title: "Decision",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Question",
      description: 'For example: "Is the signature valid?"',
      type: "string",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [
        defineArrayMember({
          name: "flowOutcome",
          title: "Outcome",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Outcome",
              description: 'For example: "Yes" or "No".',
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "items",
              title: "Steps for this outcome",
              description: "Add steps or another decision.",
              type: "array",
              of: [
                defineArrayMember({ type: "flowDecisionStep" }),
                defineArrayMember({ type: "flowDecision" }),
              ],
              validation: (rule) => rule.required().min(1).max(12),
            }),
          ],
          preview: {
            select: { title: "label", items: "items" },
            prepare({ title, items }) {
              const count = Array.isArray(items) ? items.length : 0;
              return {
                title: title || "Untitled outcome",
                subtitle: `${count} ${count === 1 ? "item" : "items"}`,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "connectorLabel",
      title: "Transition after decision",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
  ],
  preview: {
    select: { title: "label", outcomes: "outcomes" },
    prepare({ title, outcomes }) {
      const count = Array.isArray(outcomes) ? outcomes.length : 0;
      return {
        title: title || "Untitled decision",
        subtitle: `Decision · ${count} ${count === 1 ? "outcome" : "outcomes"}`,
      };
    },
  },
});
