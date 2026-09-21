import { shopifyFetch } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "./queries";
import { flattenConnection } from "./reshape";
import { mockProducts } from "./mock-data";
import type { Cart, CartLine, Money, Product, ProductVariant } from "./types";

type RawCart = Omit<Cart, "lines"> & {
  lines: { edges: { node: CartLine }[] };
};

function reshapeCart(raw: RawCart): Cart {
  return { ...raw, lines: flattenConnection(raw.lines) };
}

function money(amount: number): Money {
  return { amount: amount.toFixed(2), currencyCode: "USD" };
}

export function createEmptyCart(): Cart {
  return {
    id: "",
    checkoutUrl: "",
    totalQuantity: 0,
    cost: {
      subtotalAmount: money(0),
      totalAmount: money(0),
      totalTaxAmount: null,
    },
    lines: [],
  };
}

// ---------------------------------------------------------------------------
// Real Shopify Storefront API cart mutations
// ---------------------------------------------------------------------------

export async function realCreateCart(
  variantId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: { message: string }[] };
  }>(CART_CREATE_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  });
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  return reshapeCart(data.cartCreate.cart);
}

export async function realGetCart(cartId: string): Promise<Cart | undefined> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(CART_QUERY, {
    cartId,
  });
  return data.cart ? reshapeCart(data.cart) : undefined;
}

export async function realAddLine(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: { message: string }[] };
  }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join(", ")
    );
  }
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function realUpdateLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: { message: string }[] };
  }>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join(", ")
    );
  }
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function realRemoveLine(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: { message: string }[] };
  }>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join(", ")
    );
  }
  return reshapeCart(data.cartLinesRemove.cart);
}

// ---------------------------------------------------------------------------
// Mock cart — simulates the same Cart shape locally when no store is
// connected. State is persisted by the caller (see lib/shopify/actions.ts),
// these functions are pure transforms over a Cart value.
// ---------------------------------------------------------------------------

function findMockVariant(
  variantId: string
): { product: Product; variant: ProductVariant } | undefined {
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

function buildMockCartLine(
  id: string,
  variantId: string,
  quantity: number
): CartLine {
  const found = findMockVariant(variantId);
  if (!found) {
    throw new Error(`Unknown mock variant: ${variantId}`);
  }
  const { product, variant } = found;
  return {
    id,
    quantity,
    cost: { totalAmount: money(Number(variant.price.amount) * quantity) },
    merchandise: {
      ...variant,
      product: {
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function recalcMockCart(cart: Cart): Cart {
  const totalQuantity = cart.lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, l) => sum + Number(l.cost.totalAmount.amount),
    0
  );
  return {
    ...cart,
    totalQuantity,
    cost: {
      subtotalAmount: money(subtotal),
      totalAmount: money(subtotal),
      totalTaxAmount: null,
    },
  };
}

export function mockAddLine(
  cart: Cart,
  variantId: string,
  quantity: number
): Cart {
  const existing = cart.lines.find((l) => l.merchandise.id === variantId);
  const lines = existing
    ? cart.lines.map((l) =>
        l.id === existing.id
          ? buildMockCartLine(l.id, variantId, l.quantity + quantity)
          : l
      )
    : [
        ...cart.lines,
        buildMockCartLine(
          `mock-line-${Math.random().toString(36).slice(2)}`,
          variantId,
          quantity
        ),
      ];
  return recalcMockCart({ ...cart, lines });
}

export function mockUpdateLine(
  cart: Cart,
  lineId: string,
  quantity: number
): Cart {
  const lines =
    quantity <= 0
      ? cart.lines.filter((l) => l.id !== lineId)
      : cart.lines.map((l) =>
          l.id === lineId ? buildMockCartLine(l.id, l.merchandise.id, quantity) : l
        );
  return recalcMockCart({ ...cart, lines });
}

export function mockRemoveLine(cart: Cart, lineId: string): Cart {
  return recalcMockCart({ ...cart, lines: cart.lines.filter((l) => l.id !== lineId) });
}
