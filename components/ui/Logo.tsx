import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The "K" is the real Kyvorn mark (fused-spine artwork) rather than a plain
 * text glyph, cut from public/brand/kyvorn-mark-spine-white-on-black.png
 * with a transparent background so it drops onto any dark surface cleanly.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Image
        src="/brand/kyvorn-k-mark.png"
        alt=""
        width={733}
        height={701}
        priority
        className="h-[0.9em] w-auto -translate-y-[0.03em]"
      />
      YVORN
    </span>
  );
}
