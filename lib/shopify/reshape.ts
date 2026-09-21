import type { Product, ShopifyImage } from "./types";

/** Flattens Shopify's `{ edges: [{ node }] }` connection shape into an array. */
export function flattenConnection<T>(connection?: {
  edges: { node: T }[];
}): T[] {
  return connection?.edges.map((edge) => edge.node) ?? [];
}

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: Product["variants"][number] }[] };
};

export function reshapeProduct(raw: RawProduct): Product {
  return {
    ...raw,
    images: flattenConnection(raw.images),
    variants: flattenConnection(raw.variants),
  };
}
