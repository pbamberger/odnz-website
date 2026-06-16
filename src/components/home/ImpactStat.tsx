import { Button } from "@/components/ui/Button";

export function ImpactStat() {
  return (
    <section className="bg-accent py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-8xl sm:text-9xl font-bold text-primary leading-none mb-2">10</p>
        <p className="text-2xl font-light text-charcoal mb-3">
          people can be helped by <strong className="font-bold">one donor</strong>
        </p>
        <p className="text-charcoal/60 mb-8 text-lg font-sans">
          By registering your decision and talking to your family, you can give the gift of life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/become-a-donor" variant="primary">Become a Donor</Button>
          <Button href="/about-odnz" variant="secondary">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
