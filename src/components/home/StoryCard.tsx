import Image from "next/image";
import Link from "next/link";

interface StoryCardProps {
  title: string;
  role: string;
  quote: string;
  slug: string;
  portraitUrl?: string;
}

export function StoryCard({ title, role, quote, slug, portraitUrl }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${slug}`}
      className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      {portraitUrl && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={portraitUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2 capitalize font-sans">{role}</span>
        <h3 className="font-bold text-charcoal text-lg mb-2">{title}</h3>
        <p className="text-charcoal/60 text-sm italic leading-relaxed line-clamp-3">&ldquo;{quote}&rdquo;</p>
        <span className="mt-4 text-sm font-semibold text-primary group-hover:underline font-sans">Read story →</span>
      </div>
    </Link>
  );
}
