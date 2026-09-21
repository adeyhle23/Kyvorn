"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import CartLineItem from "./CartLineItem";
import { CloseIcon } from "@/components/ui/icons";
import { formatMoney } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, isMock, isPending } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const hasItems = cart.lines.length > 0;
  const canCheckout = hasItems && !isMock && Boolean(cart.checkoutUrl);

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-steel bg-charcoal"
      >
        <div className="flex items-center justify-between border-b border-steel/60 px-6 py-5">
          <h2 className="font-headline text-2xl uppercase tracking-wide text-bone">
            Your Cart
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center text-bone-dim hover:text-rust"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {isMock && (
          <div className="border-b border-steel/60 bg-ink/60 px-6 py-2.5 text-[11px] uppercase tracking-widest text-bone-faint">
            Sample data — connect Shopify to enable real checkout
          </div>
        )}

        {hasItems ? (
          <ul className="flex-1 overflow-y-auto px-6">
            {cart.lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-headline text-3xl uppercase text-bone-dim">
              Cart&apos;s Empty
            </p>
            <p className="max-w-[26ch] text-sm text-bone-faint">
              Nothing in here yet. Go find something worth wearing through it.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 bg-rust px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink hover:bg-rust-light"
            >
              Shop Now
            </Link>
          </div>
        )}

        {hasItems && (
          <div className="border-t border-steel/60 px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-bone-dim">
                Subtotal
              </span>
              <span className="font-headline text-2xl text-bone">
                {formatMoney(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="mb-4 text-xs text-bone-faint">
              Shipping and taxes calculated at checkout.
            </p>
            {canCheckout ? (
              <a
                href={cart.checkoutUrl}
                className="block w-full bg-rust py-4 text-center font-headline text-lg uppercase tracking-wide text-ink transition-colors hover:bg-rust-light"
              >
                Checkout
              </a>
            ) : (
              <button
                type="button"
                disabled
                title={
                  isMock
                    ? "Connect a Shopify store to enable checkout"
                    : "Checkout unavailable"
                }
                className="block w-full cursor-not-allowed bg-rust/40 py-4 text-center font-headline text-lg uppercase tracking-wide text-ink/60"
              >
                {isPending ? "Updating…" : "Checkout Unavailable"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
