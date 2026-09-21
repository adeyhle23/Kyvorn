import { cn } from "@/lib/utils";
import { ImageIcon } from "./icons";

/**
 * Styled stand-in for real photography (race photos, finisher-medal shots,
 * etc.) that hasn't been shot/uploaded yet. Intentionally marked as a
 * placeholder rather than disguised as a real photo.
 */
export default function PlaceholderBlock({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden border border-steel bg-charcoal bg-grid bg-repeat text-center",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
      <ImageIcon className="h-8 w-8 text-bone-faint" />
      <p className="max-w-[70%] text-xs font-semibold uppercase tracking-widest text-bone-faint">
        {label}
      </p>
      <span className="absolute bottom-3 right-3 border border-steel px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-bone-faint">
        Photo pending
      </span>
    </div>
  );
}
