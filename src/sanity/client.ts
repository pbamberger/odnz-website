import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

// Only create a live client when real credentials are present (avoids build-time errors).
const isConfigured = /^[a-z0-9-]+$/.test(projectId);

export const client = createClient({
  projectId: isConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  useCdn: isConfigured,
});
