import { ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const tableType = defineType({
  name: "table",
  title: "Table",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "headerRows",
      title: "Header Rows",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "row",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [
                defineArrayMember({
                  name: "cell",
                  title: "Cell",
                  type: "object",
                  fields: [
                    defineField({
                      name: "value",
                      title: "Content",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "block",
                          styles: [{ title: "Normal", value: "normal" }],
                          lists: [],
                          marks: {
                            decorators: [
                              { title: "Strong", value: "strong" },
                              { title: "Emphasis", value: "em" },
                              { title: "Inline Code", value: "code" },
                            ],
                            annotations: [],
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Optional explanation displayed below the table.",
      type: "string",
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "firstColumnHeader",
      title: "Treat first column as row headings",
      description:
        "Useful for comparison tables where the first column names each row.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      rows: "rows",
      caption: "caption",
    },
    prepare({ rows, caption }) {
      const rowCount = Array.isArray(rows) ? rows.length : 0;

      return {
        title: "Table",
        subtitle: caption || `${rowCount} ${rowCount === 1 ? "row" : "rows"}`,
      };
    },
  },
});
