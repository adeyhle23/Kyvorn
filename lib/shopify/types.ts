/**
 * Types below mirror the Shopify Storefront API's field names and shapes
 * (see https://shopify.dev/docs/api/storefront), flattened from the raw
 * `edges { node }` connection format into plain arrays. Both the mock data
 * layer and the real Storefront API fetchers in this folder resolve to
 * these exact shapes, so UI components never need to know whether they're
 * looking at mock or live data.
 */

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: ShopifyImage | null;
};

export type ProductCategory = "t-shirts" | "hoodies" | "hats";

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  createdAt: string;
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: Product[];
};

export type CartLineMerchandise = ProductVariant & {
  product: {
    handle: string;
    title: string;
    featuredImage: ShopifyImage | null;
  };
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: CartLineMerchandise;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

export type ProductSortKey = "RELEVANCE" | "PRICE" | "CREATED_AT" | "BEST_SELLING";

export type ProductsQueryOptions = {
  first?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
};
