import ProductCard from "./ProductCard";
import type { Product } from "@/lib/shopify/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-steel bg-charcoal px-6 py-20 text-center">
        <p className="font-headline text-3xl uppercase text-bone-dim">
          No Products Found
        </p>
        <p className="mt-2 text-sm text-bone-faint">
          Try a different category or check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
