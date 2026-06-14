"use client";

import Link from "next/link";
import { useState } from "react";

const publicLinks = [
  { label: "About", href: "/about" },
  { label: "Donation Stories", href: "/stories" },
  { label: "Become a Donor", href: "/become-a-donor" },
  { label: "For Families", href: "/for-families" },
];

const healthcareLinks = [
  { label: "ICU Guidelines", href: "/healthcare/icu-guidelines" },
  { label: "Link Team Clinicians", href: "/healthcare/link-team" },
  { label: "Resources", href: "/healthcare/resources" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [healthcareOpen, setHealthcareOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-amber-600 font-bold text-lg">ODNZ</span>
            <span className="text-gray-700 text-sm hidden sm:block">Organ Donation NZ</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {publicLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                {l.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setHealthcareOpen(!healthcareOpen)}
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                Healthcare Professionals
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {healthcareOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-md shadow-lg py-1">
                  {healthcareLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setHealthcareOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {publicLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-gray-700 hover:text-amber-600"
            >
              {l.label}
            </Link>
          ))}
          <p className="pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Healthcare</p>
          {healthcareLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-gray-700 hover:text-amber-600 pl-2"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
