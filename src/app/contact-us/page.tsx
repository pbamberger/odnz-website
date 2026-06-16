import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getPage } from "@/sanity/cachedQueries";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const page = await getPage("contact-us");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>

      {page?.body?.length > 0 && (
        <div className="prose prose-gray max-w-none mb-10">
          <PortableText value={page.body} />
        </div>
      )}

      <div className="border-t border-gray-100 pt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
        <ContactForm />
      </div>
    </div>
  );
}
