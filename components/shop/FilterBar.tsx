import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/categories";

function buildHref(params: { category?: string; sort?: string }) {
  const search = new URLSearchParams();
  if (params.category && params.category !== "all") {
    search.set("category", params.category);
  }
  if (params.sort && params.sort !== "newest") {
    search.set("sort", params.sort);
  }
  const qs = search.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default function FilterBar({
  activeCategory,
  activeSort,
}: {
  activeCategory: string;
  activeSort: string;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-steel/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((option) => {
          const isActive = activeCategory === option.value;
          return (
            <Link
              key={option.value}
              href={buildHref({ category: option.value, sort: activeSort })}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                isActive
                  ? "border-rust bg-rust text-ink"
                  : "border-steel text-bone-dim hover:border-rust hover:text-rust"
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </nav>

      <nav aria-label="Sort products" className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = activeSort === option.value;
          return (
            <Link
              key={option.value}
              href={buildHref({ category: activeCategory, sort: option.value })}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest transition-colors",
                isActive ? "text-rust" : "text-bone-faint hover:text-bone"
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
