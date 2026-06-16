import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPage } from "@/sanity/cachedQueries";

export const metadata: Metadata = { title: "Facts and Myths" };

const subPages = [
  { label: "Statistics", href: "/facts-and-myths/statistics", description: "Data and figures on organ donation in New Zealand." },
  { label: "Myths about Organ Donation", href: "/facts-and-myths/myths", description: "Common misconceptions addressed and clarified." },
  { label: "FAQs", href: "/facts-and-myths/faqs", description: "Frequently asked questions about organ donation." },
];

export default async function FactsAndMythsPage() {
  const page = await getPage("facts-and-myths");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Facts and Myths</h1>
      {page?.body?.length > 0 && (
        <div className="prose prose-gray max-w-none mb-10">
          <PortableText value={page.body} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {subPages.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block p-5 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-gray-900 mb-1">{s.label}</h2>
            <p className="text-sm text-gray-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
