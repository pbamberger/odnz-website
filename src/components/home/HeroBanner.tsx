import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroBannerProps {
  name: string;
  role: string;
  quote: string;
  slug: string;
  portraitUrl?: string;
}

export function HeroBanner({ name, role, quote, slug, portraitUrl }: HeroBannerProps) {
  return (
    <section className="relative min-h-[560px] flex items-end bg-gray-900 overflow-hidden">
      {portraitUrl && (
        <Image
          src={portraitUrl}
          alt={name}
          fill
          priority
          className="object-cover object-top opacity-60"
          sizes="100vw"
        />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
        <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-wide mb-3 capitalize">
          {role}
        </span>
        <blockquote className="text-white text-3xl sm:text-4xl font-bold max-w-2xl leading-snug mb-4">
          "{quote}"
        </blockquote>
        <p className="text-gray-200 mb-6">— {name}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href={`/stories/${slug}`} variant="primary">Read {name}&apos;s story</Button>
          <Button href="/become-a-donor" variant="outline">Have the conversation today</Button>
        </div>
      </div>
    </section>
  );
}
