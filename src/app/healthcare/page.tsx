import type { Metadata } from "next";
import Link from "next/link";
import { getHealthcarePages } from "@/sanity/cachedQueries";

export const metadata: Metadata = { title: "Healthcare Professionals" };

const sections = [
  { key: "icu-guidelines", label: "ICU Guidelines", href: "/healthcare/icu-guidelines", description: "Clinical protocols for intensive care unit staff managing potential organ donors." },
  { key: "link-team", label: "Link Team Clinicians", href: "/healthcare/link-team", description: "Resources and guidance for Link Team members coordinating donation." },
  { key: "resources", label: "Resources & Downloads", href: "/healthcare/resources", description: "Forms, reference materials, and downloadable clinical resources." },
];

export default async function HealthcareLandingPage() {
  const pages = await getHealthcarePages();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Healthcare Professionals</h1>
      <p className="text-gray-600 mb-10 max-w-xl">
        Clinical resources and guidelines for ICU staff, emergency clinicians, and Link Team members involved in organ donation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => {
          const count = pages?.filter((p: any) => p.section === s.key).length ?? 0;
          return (
            <Link
              key={s.key}
              href={s.href}
              className="block p-5 border border-gray-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <h2 className="font-semibold text-gray-900 mb-1">{s.label}</h2>
              <p className="text-sm text-gray-500 mb-3">{s.description}</p>
              {count > 0 && <span className="text-xs text-amber-600">{count} page{count !== 1 ? "s" : ""}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
