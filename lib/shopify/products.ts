import { isShopifyConfigured } from "./config";
import { shopifyFetch } from "./client";
import {
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
} from "./queries";
import { flattenConnection, reshapeProduct } from "./reshape";
import {
  getMockProductByHandle,
  mockCollections,
  mockProducts,
} from "./mock-data";
import type { Collection, Product, ProductsQueryOptions } from "./types";

export async function getProducts(
  options: ProductsQueryOptions = {}
): Promise<Product[]> {
  const { first = 50, sortKey = "CREATED_AT", reverse = true, query } = options;

  if (!isShopifyConfigured) {
    let results = [...mockProducts];
    if (query) {
      const tagMatch = /tag:'?([^'\s]+)'?/i.exec(query);
      if (tagMatch) {
        results = results.filter((p) => p.tags.includes(tagMatch[1]));
      }
    }
    if (sortKey === "PRICE") {
      results.sort((a, b) => {
        const diff =
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount);
        return reverse ? -diff : diff;
      });
    } else {
      results.sort((a, b) => {
        const diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return reverse ? -diff : diff;
      });
    }
    return results.slice(0, first);
  }

  const data = await shopifyFetch<{
    products: { edges: { node: Parameters<typeof reshapeProduct>[0] }[] };
  }>(PRODUCTS_QUERY, { first, sortKey, reverse, query });

  return flattenConnection(data.products).map(reshapeProduct);
}

export async function getProductByHandle(
  handle: string
): Promise<Product | undefined> {
  if (!isShopifyConfigured) {
    return getMockProductByHandle(handle);
  }

  const data = await shopifyFetch<{
    product: Parameters<typeof reshapeProduct>[0] | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.product ? reshapeProduct(data.product) : undefined;
}

export async function getCollectionByHandle(
  handle: string,
  first = 50
): Promise<Collection | undefined> {
  if (!isShopifyConfigured) {
    return mockCollections.find((c) => c.handle === handle);
  }

  const data = await shopifyFetch<{
    collection:
      | (Omit<Collection, "products"> & {
          products: { edges: { node: Parameters<typeof reshapeProduct>[0] }[] };
        })
      | null;
  }>(COLLECTION_BY_HANDLE_QUERY, { handle, first });

  if (!data.collection) return undefined;

  return {
    ...data.collection,
    products: flattenConnection(data.collection.products).map(reshapeProduct),
  };
}

export async function getRelatedProducts(
  product: Product,
  first = 4
): Promise<Product[]> {
  const primaryTag = product.tags.find((t) =>
    ["t-shirt", "hoodie", "hat"].includes(t)
  );

  const candidates = await getProducts({
    query: primaryTag ? `tag:${primaryTag}` : undefined,
    first: first + 1,
  });

  return candidates.filter((p) => p.id !== product.id).slice(0, first);
}
