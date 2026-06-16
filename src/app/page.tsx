import { getStories } from "@/sanity/cachedQueries";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ImpactStat } from "@/components/home/ImpactStat";
import { StoryCard } from "@/components/home/StoryCard";
import { Button } from "@/components/ui/Button";

export default async function HomePage() {
  const stories = await getStories();
  const [hero, ...rest] = stories ?? [];

  return (
    <>
      {hero && (
        <HeroBanner
          name={hero.title}
          role={hero.role}
          quote={hero.quote}
          slug={hero.slug.current}
          portraitUrl={hero.portrait?.asset?.url}
        />
      )}
      <ImpactStat />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Donation Stories</h2>
          <Button href="/stories" variant="secondary">See all stories</Button>
        </div>
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.slice(0, 3).map((s: any) => (
              <StoryCard
                key={s._id}
                title={s.title}
                role={s.role}
                quote={s.quote}
                slug={s.slug.current}
                portraitUrl={s.portrait?.asset?.url}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">Stories coming soon.</p>
        )}
      </section>
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have the conversation today</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            The most important thing you can do is talk to your family about your wishes.
            Registration is important, but your family&apos;s support makes donation possible.
          </p>
          <Button href="/become-a-donor">Become a Donor</Button>
        </div>
      </section>
    </>
  );
}
