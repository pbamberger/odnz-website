import type { Metadata } from "next";
import Link from "next/link";
import { getPagesList } from "@/sanity/cachedQueries";

export const metadata: Metadata = { title: "Media Centre" };

export default async function MediaCentrePage() {
  const allPages = await getPagesList();
  const articles = (allPages ?? []).filter((p: { slug: { current: string } }) =>
    p.slug.current.startsWith("media-")
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Media Centre</h1>
      <p className="text-gray-600 mb-10 text-lg">
        News, media releases, and stories from Organ Donation New Zealand.
      </p>
      {articles.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {articles.map((a: { _id: string; title: string; slug: { current: string } }) => (
            <li key={a._id}>
              <Link
                href={`/${a.slug.current}`}
                className="flex items-center justify-between py-4 group hover:text-secondary transition-colors"
              >
                <span className="text-gray-800 group-hover:text-secondary font-medium">{a.title}</span>
                <span className="text-gray-400 group-hover:text-secondary ml-4 shrink-0">→</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-20">Articles coming soon.</p>
      )}
    </div>
  );
}
