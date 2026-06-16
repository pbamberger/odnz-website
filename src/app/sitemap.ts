import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE = "https://odnz-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const isConfigured = /^[a-z0-9-]+$/.test(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "");

  const [stories, pages, healthcarePages] = isConfigured
    ? await Promise.all([
        client.fetch(`*[_type == "story"] { "slug": slug.current }`).catch(() => []),
        client.fetch(`*[_type == "page"] { "slug": slug.current, _updatedAt }`).catch(() => []),
        client.fetch(`*[_type == "healthcarePage"] { section, chapterOrder, _updatedAt }`).catch(() => []),
      ])
    : [[], [], []];

  const statics: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/stories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/media-centre`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/facts-and-myths`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/facts-and-myths/statistics`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/facts-and-myths/myths`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/facts-and-myths/faqs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/healthcare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/healthcare/icu-guidelines`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/healthcare/emergency-department`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/healthcare/operating-theatre`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/healthcare/resources`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const storyUrls: MetadataRoute.Sitemap = (stories as { slug: string }[]).map((s) => ({
    url: `${BASE}/stories/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pageUrls: MetadataRoute.Sitemap = (pages as { slug: string; _updatedAt: string }[])
    .filter((p) => !p.slug.startsWith("media-"))
    .map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const mediaUrls: MetadataRoute.Sitemap = (pages as { slug: string; _updatedAt: string }[])
    .filter((p) => p.slug.startsWith("media-"))
    .map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  const healthcareUrls: MetadataRoute.Sitemap = (
    healthcarePages as { section: string; chapterOrder: number; _updatedAt: string }[]
  ).map((p) => ({
    url: `${BASE}/healthcare/${p.section}/${p.chapterOrder}`,
    lastModified: p._updatedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...statics, ...storyUrls, ...pageUrls, ...mediaUrls, ...healthcareUrls];
}
