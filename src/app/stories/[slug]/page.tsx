import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getStory } from "@/sanity/cachedQueries";
import { Button } from "@/components/ui/Button";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.quote };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Button href="/stories" variant="secondary" className="mb-8">← Back to stories</Button>
      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide capitalize">{story.role}</span>
      <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-6">{story.title}</h1>
      {story.portrait?.asset?.url && (
        <div className="relative h-80 rounded-xl overflow-hidden mb-8">
          <Image
            src={story.portrait.asset.url}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}
      {story.quote && (
        <blockquote className="border-l-4 border-amber-500 pl-5 text-xl italic text-gray-700 mb-8">
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      )}
      {story.body && (
        <div className="prose prose-gray max-w-none">
          <PortableText value={story.body} />
        </div>
      )}
    </article>
  );
}
