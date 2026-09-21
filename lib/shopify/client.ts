import { GraphQLClient } from "graphql-request";
import {
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  getStorefrontApiEndpoint,
  isShopifyConfigured,
} from "./config";

let client: GraphQLClient | null = null;

function getClient(): GraphQLClient {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. This function should only be called when isShopifyConfigured is true."
    );
  }
  if (!client) {
    client = new GraphQLClient(getStorefrontApiEndpoint(), {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        "Content-Type": "application/json",
      },
    });
  }
  return client;
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return getClient().request<T>(query, variables);
}
