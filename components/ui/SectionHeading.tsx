import { cn } from "@/lib/utils";

export default function SectionHeading({
  kicker,
  title,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {kicker && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-rust" aria-hidden="true" />
          {kicker}
        </div>
      )}
      <h2 className="font-headline text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}
