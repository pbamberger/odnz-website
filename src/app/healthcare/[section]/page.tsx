import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getHealthcarePagesBySection, getPage } from "@/sanity/cachedQueries";

const SECTION_META: Record<string, { label: string; description: string }> = {
  "icu-guidelines": {
    label: "ICU Guidelines",
    description: "Clinical protocols for intensive care unit staff managing potential organ donors.",
  },
  "emergency-department": {
    label: "Emergency Department Guidelines",
    description: "Guidance for emergency department clinicians on identifying and supporting potential donors.",
  },
  "operating-theatre": {
    label: "Operating Theatre Guidelines",
    description: "Protocols and guidance for operating theatre staff involved in organ donation procedures.",
  },
  "link-team": {
    label: "Link Team Clinicians",
    description: "Resources for Link Team members coordinating organ donation.",
  },
  "resources": {
    label: "Resources & Downloads",
    description: "Forms, reference materials, and downloadable clinical resources.",
  },
};

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return { title: SECTION_META[section]?.label ?? "Healthcare" };
}

export default async function HealthcareSectionPage({ params }: Props) {
  const { section } = await params;
  const meta = SECTION_META[section];
  if (!meta) notFound();

  if (section === "resources") {
    const page = await getPage("healthcare-documents-and-forms");
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{meta.label}</h1>
        {page?.body?.length > 0 ? (
          <div className="prose prose-gray max-w-none">
            <PortableText value={page.body} />
          </div>
        ) : (
          <p className="text-gray-500">Resources coming soon.</p>
        )}
      </div>
    );
  }

  if (section === "link-team") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{meta.label}</h1>
        <p className="text-gray-600 mb-6">{meta.description}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-amber-800">
          The ODNZ Link portal is a secure area for Link Team clinicians. Please contact ODNZ directly to request access.
        </div>
      </div>
    );
  }

  const chapters = await getHealthcarePagesBySection(section);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{meta.label}</h1>
      <p className="text-gray-600 mb-8">{meta.description}</p>
      {chapters?.length > 0 ? (
        <ol className="space-y-3">
          {chapters.map((ch: { _id: string; title: string; chapterOrder: number }) => (
            <li key={ch._id}>
              <Link
                href={`/healthcare/${section}/${ch.chapterOrder}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl font-bold text-gray-200 group-hover:text-amber-300 transition-colors w-8 shrink-0 text-right">
                  {ch.chapterOrder}
                </span>
                <span className="text-gray-800 group-hover:text-gray-900 font-medium">{ch.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">No chapters found.</p>
      )}
    </div>
  );
}
