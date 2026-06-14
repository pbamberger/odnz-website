import { groq } from "next-sanity";

export const storiesQuery = groq`
  *[_type == "story"] | order(publishedAt desc) {
    _id, title, slug, role, quote,
    portrait { asset->{ url }, hotspot, crop }
  }
`;

export const storyBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    _id, title, slug, role, quote, publishedAt,
    portrait { asset->{ url }, hotspot, crop },
    body
  }
`;

export const healthcarePagesQuery = groq`
  *[_type == "healthcarePage"] | order(chapterOrder asc) {
    _id, title, slug, section, chapterOrder
  }
`;

export const healthcarePageBySlugQuery = groq`
  *[_type == "healthcarePage" && slug.current == $slug][0] {
    _id, title, slug, section, chapterOrder, body,
    downloadableFiles[] { label, url }
  }
`;
