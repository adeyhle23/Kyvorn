import type { Metadata } from "next";
import Image from "next/image";
import Timeline from "@/components/story/Timeline";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "A T-12 spinal fracture, a week of paralysis, and the walk back — through a sprint triathlon, a marathon, and an ultramarathon. This is the story behind Kyvorn.",
};

export default function StoryPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-steel/60 bg-ink py-24 sm:py-32">
        <div className="absolute inset-0 bg-topo bg-repeat opacity-60" aria-hidden="true" />
        <div className="container-kyvorn relative grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
              <span className="h-px w-8 bg-rust" aria-hidden="true" />
              Built Through Adversity
            </div>
            <h1 className="font-headline text-6xl uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl">
              This Isn&apos;t
              <br />
              A Highlight Reel
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
              It&apos;s the record of what it took to get back up — vertebra
              by vertebra, step by step, mile by mile.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xs">
            <Image
              src="/brand/kyvorn-mark-spine-white-on-black.png"
              alt="The Kyvorn mark: a K built from a fused spine with surgical hardware"
              fill
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-kyvorn max-w-3xl">
          <Reveal>
            <p className="font-headline text-3xl leading-tight text-bone sm:text-4xl">
              &ldquo;I didn&apos;t know if I&apos;d walk without help again.
              I didn&apos;t decide to become an athlete out of that moment —
              I decided to take the next step. Then the one after it.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-steel/60 bg-charcoal py-20 sm:py-28">
        <div className="container-kyvorn max-w-5xl">
          <div className="mb-16">
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
              <span className="h-px w-8 bg-rust" aria-hidden="true" />
              The Timeline
            </div>
            <h2 className="font-headline text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              From T-12 To Ultramarathon
            </h2>
          </div>

          <Timeline />
        </div>
      </section>

      <section className="py-20 text-center sm:py-28">
        <div className="container-kyvorn">
          <h2 className="font-headline text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
            Built Through Adversity.
            <br />
            Worn The Same Way.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-bone-dim">
            Every piece carries the same mark. None of it sells a miracle —
            just the work.
          </p>
          <div className="mt-8">
            <LinkButton href="/shop" size="lg">
              Shop The Collection
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
