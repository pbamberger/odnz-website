import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPage } from "@/sanity/cachedQueries";

const TOPICS: Record<string, string> = {
  statistics: "Statistics",
  myths: "Myths about Organ Donation",
  faqs: "FAQs",
};

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  return { title: TOPICS[topic] ?? "Not found" };
}

export default async function FactsAndMythsTopicPage({ params }: Props) {
  const { topic } = await params;
  if (!TOPICS[topic]) notFound();

  const page = await getPage(`facts-and-myths-${topic}`);
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{page.title}</h1>
      {page.body?.length > 0 && (
        <div className="prose prose-gray max-w-none">
          <PortableText value={page.body} />
        </div>
      )}
    </div>
  );
}
