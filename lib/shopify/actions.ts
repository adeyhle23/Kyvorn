"use server";

import { cookies } from "next/headers";
import { isShopifyConfigured } from "./config";
import type { Cart } from "./types";
import {
  createEmptyCart,
  mockAddLine,
  mockRemoveLine,
  mockUpdateLine,
  realAddLine,
  realCreateCart,
  realGetCart,
  realRemoveLine,
  realUpdateLine,
} from "./cart";

const CART_ID_COOKIE = "kyvorn_cart_id";
const MOCK_CART_COOKIE = "kyvorn_mock_cart";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function readMockCart(): Promise<Cart> {
  const raw = cookies().get(MOCK_CART_COOKIE)?.value;
  if (!raw) return createEmptyCart();
  try {
    return JSON.parse(raw) as Cart;
  } catch {
    return createEmptyCart();
  }
}

function writeMockCart(cart: Cart) {
  cookies().set(MOCK_CART_COOKIE, JSON.stringify(cart), {
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

/** Fetches the current cart, creating none yet — a cart is created lazily on first add. */
export async function getOrCreateCart(): Promise<Cart> {
  if (!isShopifyConfigured) {
    return readMockCart();
  }

  const cartId = cookies().get(CART_ID_COOKIE)?.value;
  if (cartId) {
    const cart = await realGetCart(cartId);
    if (cart) return cart;
  }
  return createEmptyCart();
}

export async function addCartLine(
  variantId: string,
  quantity: number
): Promise<Cart> {
  if (!isShopifyConfigured) {
    const cart = mockAddLine(await readMockCart(), variantId, quantity);
    writeMockCart(cart);
    return cart;
  }

  const cartId = cookies().get(CART_ID_COOKIE)?.value;
  let cart: Cart;
  if (!cartId) {
    cart = await realCreateCart(variantId, quantity);
    cookies().set(CART_ID_COOKIE, cart.id, {
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  } else {
    cart = await realAddLine(cartId, variantId, quantity);
  }
  return cart;
}

export async function updateCartLineQuantity(
  lineId: string,
  quantity: number
): Promise<Cart> {
  if (!isShopifyConfigured) {
    const cart = mockUpdateLine(await readMockCart(), lineId, quantity);
    writeMockCart(cart);
    return cart;
  }

  const cartId = cookies().get(CART_ID_COOKIE)?.value;
  if (!cartId) return createEmptyCart();
  return realUpdateLine(cartId, lineId, quantity);
}

export async function removeCartLine(lineId: string): Promise<Cart> {
  if (!isShopifyConfigured) {
    const cart = mockRemoveLine(await readMockCart(), lineId);
    writeMockCart(cart);
    return cart;
  }

  const cartId = cookies().get(CART_ID_COOKIE)?.value;
  if (!cartId) return createEmptyCart();
  return realRemoveLine(cartId, lineId);
}
