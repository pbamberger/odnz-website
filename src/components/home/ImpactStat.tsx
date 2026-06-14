import { Button } from "@/components/ui/Button";

export function ImpactStat() {
  return (
    <section className="bg-amber-600 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-5xl font-bold mb-4">1 donor</p>
        <p className="text-2xl font-light mb-6">has the potential to help up to <strong>10 people</strong></p>
        <p className="text-amber-100 mb-8 text-lg">
          By registering your decision and talking to your family, you can give the gift of life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/have-the-conversation-today" variant="outline">Become a Donor</Button>
          <Button href="/about-odnz" variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
