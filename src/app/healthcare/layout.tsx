import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: { absolute: "Healthcare Professionals | ODNZ" } };

const sidebarLinks = [
  { label: "Overview", href: "/healthcare" },
  { label: "ICU Guidelines", href: "/healthcare/icu-guidelines" },
  { label: "Link Team Clinicians", href: "/healthcare/link-team" },
  { label: "Resources & Downloads", href: "/healthcare/resources" },
];

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="md:w-56 shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Healthcare</p>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
