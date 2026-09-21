import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function StoryTeaser() {
  return (
    <section className="border-y border-steel/60 bg-charcoal py-20 sm:py-28">
      <div className="container-kyvorn grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm">
          <Image
            src="/brand/kyvorn-mark-spine-white-on-black.png"
            alt="The Kyvorn mark: a K formed from a fused spine, representing the T-12 fracture behind the brand"
            fill
            sizes="(min-width: 1024px) 400px, 80vw"
            className="object-contain"
          />
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
            <span className="h-px w-8 bg-rust" aria-hidden="true" />
            The Story
          </div>
          <h2 className="font-headline text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
            A Broken Back.
            <br />A Rebuilt Life.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
            A T-12 spinal fracture left me temporarily paralyzed for about a
            week. I had to relearn to walk from scratch. What came after
            wasn&apos;t a slow return to normal — it was a sprint triathlon,
            a marathon, and an ultramarathon, in that order.
          </p>
          <Link
            href="/story"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-bone transition-colors hover:text-rust"
          >
            Read The Full Story
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
