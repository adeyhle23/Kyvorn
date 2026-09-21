import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

export default function ProductCard({ product }: { product: Product }) {
  const compareAt = product.variants.find((v) => v.compareAtPrice)?.compareAtPrice;
  const isSoldOut = !product.availableForSale;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block"
      aria-label={`${product.title} — ${formatMoney(product.priceRange.minVariantPrice)}${isSoldOut ? ", sold out" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
        {isSoldOut && (
          <span className="absolute left-3 top-3 border border-steel bg-ink/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-bone-dim">
            Sold Out
          </span>
        )}
        {!isSoldOut && compareAt && (
          <span className="absolute left-3 top-3 bg-rust px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-bone group-hover:text-rust">
          {product.title}
        </h3>
        <div className="flex shrink-0 items-baseline gap-2 text-sm">
          {compareAt && (
            <span className="text-bone-faint line-through">
              {formatMoney(compareAt)}
            </span>
          )}
          <span className="text-bone-dim">
            {formatMoney(product.priceRange.minVariantPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}
