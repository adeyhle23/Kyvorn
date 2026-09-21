import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import Reveal from "@/components/ui/Reveal";

const PLACEHOLDER_SLOTS = [
  "Sprint Triathlon Finish",
  "Marathon Finish Line",
  "Ultramarathon Finisher Medal",
];

export default function SocialProof() {
  return (
    <section className="border-t border-steel/60 bg-charcoal py-20 sm:py-28">
      <div className="container-kyvorn">
        <SectionHeading kicker="Proof" title="Every Mile Since" align="center" />
        <p className="mx-auto mt-4 max-w-xl text-center text-bone-dim">
          Race photos and finisher shots go here as they come in.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Reveal className="col-span-2 sm:col-span-2">
            <div className="relative aspect-[8/5] overflow-hidden border border-steel sm:aspect-[4/5]">
              <Image
                src="/photos/training-weights.jpg"
                alt="Training in progress — part of the rebuild, not the finished product"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-bone-dim">
                Training, Not Highlight Reel
              </span>
            </div>
          </Reveal>

          {PLACEHOLDER_SLOTS.map((label, i) => (
            <Reveal key={label} delayMs={i * 80}>
              <PlaceholderBlock label={label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
