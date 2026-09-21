"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatMoney } from "@/lib/utils";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import type { CartLine } from "@/lib/shopify/types";

export default function CartLineItem({ line }: { line: CartLine }) {
  const { updateItemQuantity, removeItem, isPending } = useCart();
  const image = line.merchandise.image ?? line.merchandise.product.featuredImage;
  const sizeOption = line.merchandise.selectedOptions.find(
    (o) => o.name.toLowerCase() === "size"
  );

  return (
    <li className="flex gap-4 border-b border-steel/60 py-5">
      <Link
        href={`/shop/${line.merchandise.product.handle}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden bg-charcoal"
      >
        {image && (
          <Image
            src={image.url}
            alt={image.altText ?? line.merchandise.product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/shop/${line.merchandise.product.handle}`}
              className="text-sm font-semibold uppercase tracking-wide text-bone hover:text-rust"
            >
              {line.merchandise.product.title}
            </Link>
            {sizeOption && (
              <p className="mt-1 text-xs text-bone-dim">Size {sizeOption.value}</p>
            )}
          </div>
          <p className="whitespace-nowrap text-sm font-semibold text-bone">
            {formatMoney(line.cost.totalAmount)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-steel">
            <button
              type="button"
              disabled={isPending}
              onClick={() => updateItemQuantity(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center text-bone-dim hover:text-rust disabled:opacity-40"
            >
              <MinusIcon className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm text-bone" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              disabled={isPending}
              onClick={() => updateItemQuantity(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center text-bone-dim hover:text-rust disabled:opacity-40"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${line.merchandise.product.title} from cart`}
            className="flex h-7 w-7 items-center justify-center text-bone-faint hover:text-rust disabled:opacity-40"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}
