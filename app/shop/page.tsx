import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/shopify/products";
import { tagForCategory } from "@/lib/categories";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductSkeleton";
import FilterBar from "@/components/shop/FilterBar";
import type { ProductSortKey } from "@/lib/shopify/types";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "T-shirts, hoodies, and hats built for the comeback. Shop the full Kyvorn collection.",
};

function resolveSort(sort?: string): { sortKey: ProductSortKey; reverse: boolean } {
  switch (sort) {
    case "price-asc":
      return { sortKey: "PRICE", reverse: false };
    case "price-desc":
      return { sortKey: "PRICE", reverse: true };
    default:
      return { sortKey: "CREATED_AT", reverse: true };
  }
}

async function ShopResults({
  category,
  sort,
}: {
  category: string;
  sort: string;
}) {
  const tag = tagForCategory(category);
  const { sortKey, reverse } = resolveSort(sort);

  const products = await getProducts({
    query: tag ? `tag:${tag}` : undefined,
    sortKey,
    reverse,
  });

  return <ProductGrid products={products} />;
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string };
}) {
  const category = searchParams.category ?? "all";
  const sort = searchParams.sort ?? "newest";

  return (
    <div className="container-kyvorn py-12 sm:py-16">
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-rust">
          <span className="h-px w-8 bg-rust" aria-hidden="true" />
          Full Collection
        </div>
        <h1 className="font-headline text-5xl uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl lg:text-7xl">
          Shop
        </h1>
      </div>

      <div className="mb-10">
        <FilterBar activeCategory={category} activeSort={sort} />
      </div>

      <Suspense key={`${category}-${sort}`} fallback={<ProductGridSkeleton />}>
        <ShopResults category={category} sort={sort} />
      </Suspense>
    </div>
  );
}
