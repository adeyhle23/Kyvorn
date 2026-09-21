"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { cn, formatMoney } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import type { Product, ProductVariant } from "@/lib/shopify/types";

function findVariant(
  variants: ProductVariant[],
  selected: Record<string, string>
): ProductVariant | undefined {
  return variants.find((variant) =>
    variant.selectedOptions.every((opt) => selected[opt.name] === opt.value)
  );
}

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem, isPending } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const firstAvailable =
      product.variants.find((v) => v.availableForSale) ?? product.variants[0];
    return Object.fromEntries(
      firstAvailable?.selectedOptions.map((o) => [o.name, o.value]) ?? []
    );
  });
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selected),
    [product.variants, selected]
  );

  const isSoldOut = !selectedVariant || !selectedVariant.availableForSale;

  async function handleAddToCart() {
    if (!selectedVariant || isSoldOut) return;
    await addItem(selectedVariant.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div>
      <p className="font-headline text-3xl text-bone">
        {selectedVariant
          ? formatMoney(selectedVariant.price)
          : formatMoney(product.priceRange.minVariantPrice)}
      </p>

      <div className="mt-8 space-y-6">
        {product.options.map((option) => (
          <div key={option.id}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-bone-dim">
              {option.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selected[option.name] === value;
                const variantForValue = product.variants.find((v) =>
                  v.selectedOptions.some(
                    (o) => o.name === option.name && o.value === value
                  )
                );
                const disabled = variantForValue
                  ? !variantForValue.availableForSale
                  : false;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [option.name]: value }))
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      "min-w-[3rem] border px-3 py-2 text-sm font-semibold uppercase transition-colors",
                      isSelected
                        ? "border-rust bg-rust text-ink"
                        : "border-steel text-bone-dim hover:border-bone",
                      disabled &&
                        "cursor-not-allowed border-steel/50 text-bone-faint line-through hover:border-steel/50"
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-bone-dim">
            Quantity
          </h3>
          <div className="flex w-fit items-center border border-steel">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-11 w-11 items-center justify-center text-bone-dim hover:text-rust"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-base text-bone" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex h-11 w-11 items-center justify-center text-bone-dim hover:text-rust"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSoldOut || isPending}
          className={cn(
            "w-full py-4 font-headline text-lg uppercase tracking-wide transition-colors",
            isSoldOut
              ? "cursor-not-allowed bg-charcoal-light text-bone-faint"
              : "bg-rust text-ink hover:bg-rust-light"
          )}
        >
          {isSoldOut
            ? "Sold Out"
            : isPending
              ? "Adding…"
              : justAdded
                ? "Added to Cart"
                : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
