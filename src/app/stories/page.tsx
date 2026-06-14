import type { Metadata } from "next";
import { getStories } from "@/sanity/cachedQueries";
import { StoryCard } from "@/components/home/StoryCard";

export const metadata: Metadata = { title: "Donation Stories" };

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Donation Stories</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Real stories from donors, recipients, and families whose lives have been touched by organ donation.
        </p>
      </div>
      {stories?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s: any) => (
            <StoryCard
              key={s._id}
              title={s.title}
              role={s.role}
              quote={s.quote}
              slug={s.slug.current}
              portraitUrl={s.portrait?.asset?.url}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-20">Stories coming soon.</p>
      )}
    </div>
  );
}
