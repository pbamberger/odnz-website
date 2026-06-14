import { Suspense } from "react";
import Link from "next/link";
import { CopyrightYear } from "@/components/ui/CopyrightYear";

const columns = [
  {
    heading: "Donation",
    links: [
      { label: "Become a Donor", href: "/become-a-donor" },
      { label: "Donation Stories", href: "/stories" },
      { label: "For Families", href: "/for-families" },
      { label: "FAQs", href: "/about/faqs" },
    ],
  },
  {
    heading: "Healthcare",
    links: [
      { label: "ICU Guidelines", href: "/healthcare/icu-guidelines" },
      { label: "Link Team", href: "/healthcare/link-team" },
      { label: "Resources", href: "/healthcare/resources" },
    ],
  },
  {
    heading: "Organisation",
    links: [
      { label: "About ODNZ", href: "/about" },
      { label: "Thank You Day", href: "/about/thank-you-day" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-amber-500 font-bold text-lg">ODNZ</span>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              One donor has the potential to help up to ten people.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white font-semibold text-sm mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:text-amber-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© <Suspense fallback="2026"><CopyrightYear /></Suspense> Organ Donation New Zealand</p>
          <p>
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="hover:text-gray-300">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
