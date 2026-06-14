import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Donor / Recipient Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "role",
      type: "string",
      options: { list: ["donor", "recipient", "family"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "quote", title: "Pull quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Full story", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "role", media: "portrait" },
  },
});
