"use client";

import { useCart } from "./CartContext";
import { CartIcon } from "@/components/ui/icons";

export default function CartButton() {
  const { cart, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${cart.totalQuantity} item${cart.totalQuantity === 1 ? "" : "s"}`}
      className="relative flex h-10 w-10 items-center justify-center text-bone transition-colors hover:text-rust"
    >
      <CartIcon className="h-5 w-5" />
      {cart.totalQuantity > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-rust px-1 text-[10px] font-bold text-ink">
          {cart.totalQuantity}
        </span>
      )}
    </button>
  );
}
