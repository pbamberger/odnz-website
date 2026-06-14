import { unstable_cache } from "next/cache";
import { client } from "./client";
import {
  storiesQuery, storyBySlugQuery,
  healthcarePagesQuery, healthcarePageBySlugQuery,
  pageBySlugQuery, healthcarePagesBySectionQuery, healthcareChapterQuery,
} from "./queries";

const isConfigured = /^[a-z0-9-]+$/.test(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "");

async function safeFetch<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;
  try { return await query(); } catch { return fallback; }
}

export const getStories = unstable_cache(
  () => safeFetch(() => client.fetch(storiesQuery), []),
  ["stories"],
  { tags: ["stories"], revalidate: 3600 }
);

export const getStory = unstable_cache(
  (slug: string) => safeFetch(() => client.fetch(storyBySlugQuery, { slug }), null),
  ["story"],
  { tags: ["story"], revalidate: 3600 }
);

export const getHealthcarePages = unstable_cache(
  () => safeFetch(() => client.fetch(healthcarePagesQuery), []),
  ["healthcare-pages"],
  { tags: ["healthcare-pages"], revalidate: 3600 }
);

export const getHealthcarePage = unstable_cache(
  (slug: string) => safeFetch(() => client.fetch(healthcarePageBySlugQuery, { slug }), null),
  ["healthcare-page"],
  { tags: ["healthcare-page"], revalidate: 3600 }
);

export const getPage = unstable_cache(
  (slug: string) => safeFetch(() => client.fetch(pageBySlugQuery, { slug }), null),
  ["page"],
  { tags: ["page"], revalidate: 3600 }
);

export const getHealthcarePagesBySection = unstable_cache(
  (section: string) => safeFetch(() => client.fetch(healthcarePagesBySectionQuery, { section }), []),
  ["healthcare-pages"],
  { tags: ["healthcare-pages"], revalidate: 3600 }
);

export const getHealthcareChapter = unstable_cache(
  (section: string, order: number) => safeFetch(
    () => client.fetch(healthcareChapterQuery, { section, order }),
    null
  ),
  ["healthcare-page"],
  { tags: ["healthcare-page"], revalidate: 3600 }
);
