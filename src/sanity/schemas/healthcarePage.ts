import { defineField, defineType } from "sanity";

export const healthcarePage = defineType({
  name: "healthcarePage",
  title: "Healthcare Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "section",
      type: "string",
      options: { list: ["icu-guidelines", "link-team", "resources"] },
    }),
    defineField({ name: "chapterOrder", type: "number" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "downloadableFiles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "file", type: "file" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "section" },
  },
});
