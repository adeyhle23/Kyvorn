export const CATEGORY_OPTIONS = [
  { value: "all", label: "All", tag: null },
  { value: "t-shirts", label: "T-Shirts", tag: "t-shirt" },
  { value: "hoodies", label: "Hoodies", tag: "hoodie" },
  { value: "hats", label: "Hats", tag: "hat" },
] as const;

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["value"];

export function tagForCategory(category: string | null | undefined): string | null {
  return CATEGORY_OPTIONS.find((c) => c.value === category)?.tag ?? null;
}

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];
