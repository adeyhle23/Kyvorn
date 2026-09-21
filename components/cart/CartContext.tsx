"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { addCartLine, getOrCreateCart, removeCartLine, updateCartLineQuantity } from "@/lib/shopify/actions";
import { createEmptyCart } from "@/lib/shopify/cart";
import type { Cart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: Cart;
  isOpen: boolean;
  isPending: boolean;
  isMock: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({
  children,
  isShopifyConfigured,
}: {
  children: React.ReactNode;
  isShopifyConfigured: boolean;
}) {
  const [cart, setCart] = useState<Cart>(createEmptyCart());
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    getOrCreateCart().then(setCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setPendingCount((n) => n + 1);
    try {
      const updated = await addCartLine(variantId, quantity);
      setCart(updated);
      setIsOpen(true);
    } finally {
      setPendingCount((n) => n - 1);
    }
  }, []);

  const updateItemQuantity = useCallback(async (lineId: string, quantity: number) => {
    setPendingCount((n) => n + 1);
    try {
      const updated = await updateCartLineQuantity(lineId, quantity);
      setCart(updated);
    } finally {
      setPendingCount((n) => n - 1);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    setPendingCount((n) => n + 1);
    try {
      const updated = await removeCartLine(lineId);
      setCart(updated);
    } finally {
      setPendingCount((n) => n - 1);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isPending: pendingCount > 0,
      isMock: !isShopifyConfigured,
      openCart,
      closeCart,
      addItem,
      updateItemQuantity,
      removeItem,
    }),
    [cart, isOpen, pendingCount, isShopifyConfigured, openCart, closeCart, addItem, updateItemQuantity, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
