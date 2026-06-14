import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getHealthcareChapter, getHealthcarePagesBySection } from "@/sanity/cachedQueries";

const SECTION_LABELS: Record<string, string> = {
  "icu-guidelines": "ICU Guidelines",
  "emergency-department": "Emergency Department Guidelines",
  "operating-theatre": "Operating Theatre Guidelines",
};

type Props = { params: Promise<{ section: string; chapter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, chapter } = await params;
  const page = await getHealthcareChapter(section, parseInt(chapter, 10));
  return { title: page?.title ?? "Chapter not found" };
}

export default async function HealthcareChapterPage({ params }: Props) {
  const { section, chapter } = await params;
  const order = parseInt(chapter, 10);
  if (isNaN(order)) notFound();

  const [page, allChapters] = await Promise.all([
    getHealthcareChapter(section, order),
    getHealthcarePagesBySection(section),
  ]);

  if (!page) notFound();

  const sectionLabel = SECTION_LABELS[section] ?? "Healthcare";
  const idx = allChapters?.findIndex((c: { chapterOrder: number }) => c.chapterOrder === order) ?? -1;
  const prev = idx > 0 ? allChapters[idx - 1] : null;
  const next = idx < (allChapters?.length ?? 0) - 1 ? allChapters[idx + 1] : null;

  return (
    <div>
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href={`/healthcare/${section}`} className="hover:text-amber-600">{sectionLabel}</Link>
        <span>›</span>
        <span className="text-gray-700">{page.title}</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">{page.title}</h1>

      {page.body?.length > 0 && (
        <div className="prose prose-gray max-w-none mb-10">
          <PortableText value={page.body} />
        </div>
      )}

      {page.downloadableFiles?.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-5 mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Downloads</h2>
          <ul className="space-y-2">
            {page.downloadableFiles.map((f: { label: string; url: string }, i: number) => (
              <li key={i}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-2"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(prev || next) && (
        <div className="flex justify-between pt-6 border-t border-gray-100">
          {prev ? (
            <Link
              href={`/healthcare/${section}/${prev.chapterOrder}`}
              className="text-sm text-gray-600 hover:text-amber-600"
            >
              ← {prev.title}
            </Link>
          ) : <span />}
          {next && (
            <Link
              href={`/healthcare/${section}/${next.chapterOrder}`}
              className="text-sm text-gray-600 hover:text-amber-600"
            >
              {next.title} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
