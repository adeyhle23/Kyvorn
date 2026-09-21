import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Milestone = {
  tag: string;
  title: string;
  body: string;
};

const MILESTONES: Milestone[] = [
  {
    tag: "The Break",
    title: "T-12",
    body: "A fall fractured the T-12 vertebra in my lower spine. One moment upright, the next flat on the ground with no idea what my legs would do next.",
  },
  {
    tag: "Week One",
    title: "Paralyzed",
    body: "For about a week, my legs didn't respond. Not weak — gone. No timeline from anyone on whether that would change, or when.",
  },
  {
    tag: "The Rebuild",
    title: "Learning to Walk, Again",
    body: "Movement came back, but not the way it left. Standing had to be relearned. Then a single step. Then a hallway. Physical therapy became the whole job for months.",
  },
  {
    tag: "Finish Line One",
    title: "Sprint Triathlon",
    body: "Swim, bike, run — in that order, on the same day I once wasn't sure I'd walk unassisted again. Not fast. Finished.",
  },
  {
    tag: "Finish Line Two",
    title: "Marathon",
    body: "26.2 miles. The body that had to relearn how to stand carried itself the full distance, on its own terms.",
  },
  {
    tag: "Finish Line Three",
    title: "Ultramarathon",
    body: "Past the marathon distance, into the territory where most people stop asking ‘can I’ and start asking ‘how far.’ That’s where Kyvorn starts.",
  },
];

export default function Timeline() {
  return (
    <ol className="relative">
      <div
        className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-steel sm:left-1/2"
        aria-hidden="true"
      />

      {MILESTONES.map((milestone, index) => {
        const isEven = index % 2 === 0;
        const content = (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-rust">
              {milestone.tag}
            </p>
            <h3 className="mt-2 font-headline text-3xl uppercase tracking-tight text-bone sm:text-4xl">
              {milestone.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-bone-dim sm:text-base">
              {milestone.body}
            </p>
          </div>
        );

        return (
          <li
            key={milestone.title}
            className="relative mb-14 pl-12 last:mb-0 sm:mb-20 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:pl-0"
          >
            <div className="absolute left-4 top-1 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center border border-rust bg-ink font-headline text-sm text-rust sm:left-1/2">
              {index + 1}
            </div>

            <Reveal className={cn(!isEven && "sm:col-start-2")}>
              <div className={cn(isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10")}>
                {content}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
