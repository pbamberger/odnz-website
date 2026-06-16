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
    <section className="bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest mb-4 capitalize font-sans">
            {role}
          </span>
          <blockquote className="text-white text-3xl sm:text-4xl font-bold leading-snug mb-4">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <p className="text-white/60 mb-8 font-sans">— {name}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/stories/${slug}`} variant="primary">Read {name}&apos;s story</Button>
            <Button href="/become-a-donor" variant="outline">Become a Donor</Button>
          </div>
        </div>
        {portraitUrl && (
          <div className="hidden lg:block">
            <Image
              src={portraitUrl}
              alt={name}
              width={500}
              height={600}
              className="rounded-2xl object-cover object-top w-full h-[520px]"
              priority
              sizes="(max-width: 1024px) 0px, 500px"
            />
          </div>
        )}
      </div>
    </section>
  );
}
