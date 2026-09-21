import { cn } from "@/lib/utils";

/**
 * A sharp, angled seam between sections — used instead of a plain
 * horizontal rule to keep transitions tactical rather than soft.
 */
export default function AngledDivider({
  tone = "rust",
  flip = false,
  className,
}: {
  tone?: "rust" | "steel";
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-3 w-full sm:h-4", tone === "rust" ? "bg-rust" : "bg-steel", className)}
      style={{
        clipPath: flip
          ? "polygon(0 0, 100% 100%, 0 100%)"
          : "polygon(0 100%, 100% 0, 100% 100%)",
      }}
    />
  );
}
