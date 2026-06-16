import { Suspense } from "react";
import Link from "next/link";
import { CopyrightYear } from "@/components/ui/CopyrightYear";

const columns = [
  {
    heading: "Donation",
    links: [
      { label: "Become a Donor", href: "/become-a-donor" },
      { label: "Donation Stories", href: "/stories" },
      { label: "For Families", href: "/knowledge-centre" },
      { label: "FAQs", href: "/facts-and-myths/faqs" },
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
      { label: "About ODNZ", href: "/about-odnz" },
      { label: "Thank You Day", href: "/thank-you-day" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-white font-bold text-lg tracking-tight">ODNZ</span>
            <p className="mt-2 text-sm text-white/50 leading-relaxed">
              One donor has the potential to help up to ten people.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white font-semibold text-sm mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:text-secondary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <p>© <Suspense fallback="2026"><CopyrightYear /></Suspense> Organ Donation New Zealand</p>
          <p>
            <Link href="/privacy-policy" className="hover:text-white/70">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
