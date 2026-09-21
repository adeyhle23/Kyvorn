export const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
export const SHOPIFY_STOREFRONT_API_VERSION =
  process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2024-10";

/**
 * True once real Storefront API credentials are present. Every data
 * function in lib/shopify checks this and falls back to lib/shopify/mock-data
 * when it's false, so the whole UI works before a Shopify store is wired up.
 */
export const isShopifyConfigured = Boolean(
  SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN
);

export function getStorefrontApiEndpoint(): string {
  return `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
}

export const FEATURED_COLLECTION_HANDLE =
  process.env.SHOPIFY_FEATURED_COLLECTION_HANDLE ?? "featured";
