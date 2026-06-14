import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPage } from "@/sanity/cachedQueries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return { title: page?.title ?? "Not found" };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{page.title}</h1>
      {page.body?.length > 0 && (
        <div className="prose prose-gray max-w-none">
          <PortableText value={page.body} />
        </div>
      )}
    </div>
  );
}
