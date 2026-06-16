"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const publicLinks = [
  { label: "About", href: "/about-odnz" },
  { label: "Donation Stories", href: "/stories" },
  { label: "Become a Donor", href: "/become-a-donor" },
  { label: "For Families", href: "/knowledge-centre" },
];

const healthcareLinks = [
  { label: "ICU Guidelines", href: "/healthcare/icu-guidelines" },
  { label: "Link Team Clinicians", href: "/healthcare/link-team" },
  { label: "Resources", href: "/healthcare/resources" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [healthcareOpen, setHealthcareOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!healthcareOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHealthcareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [healthcareOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setHealthcareOpen(false);
  }, [pathname]);

  const healthcareActive = pathname.startsWith("/healthcare");

  return (
    <nav aria-label="Main navigation" className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg tracking-tight">ODNZ</span>
            <span className="text-charcoal/50 text-sm hidden sm:block">Organ Donation NZ</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {publicLinks.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-colors ${active ? "text-secondary font-semibold" : "text-charcoal/70 hover:text-primary"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setHealthcareOpen(!healthcareOpen)}
                aria-expanded={healthcareOpen}
                aria-haspopup="menu"
                className={`text-sm transition-colors flex items-center gap-1 ${healthcareActive ? "text-secondary font-semibold" : "text-charcoal/70 hover:text-primary"}`}
              >
                Healthcare Professionals
                <svg
                  className={`w-4 h-4 transition-transform ${healthcareOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {healthcareOpen && (
                <div role="menu" className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-md shadow-lg py-1">
                  {healthcareLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      role="menuitem"
                      onClick={() => setHealthcareOpen(false)}
                      className="block px-4 py-2 text-sm text-charcoal hover:bg-accent hover:text-primary"
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
            className="md:hidden p-2 text-charcoal/70"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
          {publicLinks.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block py-2 text-sm ${active ? "text-secondary font-semibold" : "text-charcoal/70 hover:text-primary"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <p className="pt-2 pb-1 text-xs font-semibold text-charcoal/40 uppercase tracking-wide">Healthcare</p>
          {healthcareLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-charcoal/70 hover:text-primary pl-2"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
