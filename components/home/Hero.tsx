import { LinkButton } from "@/components/ui/Button";
import HeroBackground from "@/components/home/HeroBackground";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink sm:min-h-[92vh]">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-grid bg-repeat opacity-40" aria-hidden="true" />

      <div className="container-kyvorn relative z-10 pb-16 pt-40 sm:pb-24">
        <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
          <span className="h-px w-8 bg-rust" aria-hidden="true" />
          Built Through Adversity
        </div>
        <h1 className="max-w-4xl font-headline text-6xl uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl lg:text-8xl">
          Rebuilt From
          <br />
          The Ground Up
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
          Built for those who have been tested, broken down, and came back
          anyway.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <LinkButton href="/shop" size="lg">
            Shop Now
          </LinkButton>
          <LinkButton href="/story" variant="outline" size="lg">
            Read The Story
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
