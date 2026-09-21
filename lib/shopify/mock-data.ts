import type { Collection, Product } from "./types";

/**
 * Mock catalog used whenever SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN
 * are not set. Shaped identically to the flattened Product/Collection types
 * that the real Storefront API fetchers in this folder resolve to, so the UI
 * needs zero changes once real credentials are dropped into .env.local.
 *
 * Product images point at /public/products placeholder art — swap in real
 * Shopify CDN photography by simply connecting a real store.
 */

function money(amount: number): { amount: string; currencyCode: string } {
  return { amount: amount.toFixed(2), currencyCode: "USD" };
}

const SIZES = ["S", "M", "L", "XL", "XXL"];

type MockProductSeed = {
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  tag: "t-shirt" | "hoodie" | "hat";
  placeholder: string;
  outOfStockSizes?: string[];
  createdAt: string;
};

const HAT_SIZES = ["One Size"];

const SEEDS: MockProductSeed[] = [
  {
    handle: "t-12-tee",
    title: "T-12 Tee",
    description:
      "Named for the vertebra that broke. Heavyweight 100% cotton, boxy fit, rust print across the chest. Built to outlast the story it references.",
    price: 34,
    tag: "t-shirt",
    placeholder: "/products/placeholder-tee.svg",
    createdAt: "2026-06-01T00:00:00.000Z",
  },
  {
    handle: "comeback-tee",
    title: "Comeback Tee",
    description:
      "No slogans, just the mark. Garment-dyed for a faded, worked-in look from day one. Mid-weight cotton that holds up to actual training.",
    price: 32,
    tag: "t-shirt",
    placeholder: "/products/placeholder-tee.svg",
    createdAt: "2026-07-14T00:00:00.000Z",
  },
  {
    handle: "mile-marker-tee",
    title: "Mile Marker Tee",
    description:
      "Back-print distance markers for sprint tri, marathon, and ultra — the three finish lines that rebuilt the brand. Front chest hit, standard fit.",
    price: 34,
    tag: "t-shirt",
    placeholder: "/products/placeholder-tee.svg",
    outOfStockSizes: ["XXL"],
    createdAt: "2026-03-22T00:00:00.000Z",
  },
  {
    handle: "relentless-hoodie",
    title: "Relentless Hoodie",
    description:
      "Heavyweight 480gsm fleece, brushed interior, ribbed cuffs built to take a beating in cold-weather training blocks. Kangaroo pocket, adjustable hood.",
    price: 68,
    compareAtPrice: 78,
    tag: "hoodie",
    placeholder: "/products/placeholder-hoodie.svg",
    createdAt: "2026-08-02T00:00:00.000Z",
  },
  {
    handle: "built-through-adversity-hoodie",
    title: "Built Through Adversity Hoodie",
    description:
      "The full tagline, back-printed in block type. Midweight fleece with a relaxed fit for layering through fall training.",
    price: 66,
    tag: "hoodie",
    placeholder: "/products/placeholder-hoodie.svg",
    createdAt: "2026-05-10T00:00:00.000Z",
  },
  {
    handle: "t-12-hoodie",
    title: "T-12 Hoodie",
    description:
      "Same story as the tee, heavier weight. Fleece-lined hood, double-stitched seams, built for the miles that don't care about the weather.",
    price: 70,
    tag: "hoodie",
    placeholder: "/products/placeholder-hoodie.svg",
    outOfStockSizes: ["S"],
    createdAt: "2026-02-18T00:00:00.000Z",
  },
  {
    handle: "finish-line-cap",
    title: "Finish Line Cap",
    description:
      "Structured 6-panel, low profile, rust embroidery on bone. Adjustable strap back. The one you wear after, not during.",
    price: 28,
    tag: "hat",
    placeholder: "/products/placeholder-hat.svg",
    createdAt: "2026-07-30T00:00:00.000Z",
  },
  {
    handle: "grit-trucker-cap",
    title: "Grit Trucker Cap",
    description:
      "Mesh back, foam front panel, unstructured crown. Built for long days outside, not for staying clean.",
    price: 26,
    tag: "hat",
    placeholder: "/products/placeholder-hat.svg",
    createdAt: "2026-04-12T00:00:00.000Z",
  },
  {
    handle: "k-mark-cap",
    title: "K-Mark Cap",
    description:
      "Just the mark, small and centered. Low-profile dad cap silhouette in washed cotton twill.",
    price: 28,
    tag: "hat",
    placeholder: "/products/placeholder-hat.svg",
    createdAt: "2026-08-20T00:00:00.000Z",
  },
];

export const mockProducts: Product[] = SEEDS.map((seed, index) => {
  const id = `gid://shopify/Product/${1000 + index}`;
  const sizes = seed.tag === "hat" ? HAT_SIZES : SIZES;
  const variants = sizes.map((size, i) => ({
    id: `${id}-var-${i}`,
    title: size,
    availableForSale: !(seed.outOfStockSizes ?? []).includes(size),
    quantityAvailable: (seed.outOfStockSizes ?? []).includes(size) ? 0 : 24,
    selectedOptions: [{ name: "Size", value: size }],
    price: money(seed.price),
    compareAtPrice: seed.compareAtPrice ? money(seed.compareAtPrice) : null,
    image: {
      url: seed.placeholder,
      altText: `${seed.title} — placeholder product image`,
      width: 800,
      height: 1000,
    },
  }));

  return {
    id,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    descriptionHtml: `<p>${seed.description}</p>`,
    tags: [seed.tag, "unisex"],
    productType:
      seed.tag === "t-shirt" ? "T-Shirt" : seed.tag === "hoodie" ? "Hoodie" : "Hat",
    availableForSale: variants.some((v) => v.availableForSale),
    featuredImage: {
      url: seed.placeholder,
      altText: `${seed.title} — placeholder product image`,
      width: 800,
      height: 1000,
    },
    images: [
      {
        url: seed.placeholder,
        altText: `${seed.title} — placeholder product image`,
        width: 800,
        height: 1000,
      },
    ],
    options: [
      {
        id: "opt-size",
        name: "Size",
        values: sizes,
      },
    ],
    variants,
    priceRange: {
      minVariantPrice: money(seed.price),
      maxVariantPrice: money(seed.price),
    },
    createdAt: seed.createdAt,
    seo: {
      title: null,
      description: null,
    },
  };
});

export function getMockProductByHandle(handle: string): Product | undefined {
  return mockProducts.find((p) => p.handle === handle);
}

export function getMockProductsByTag(tag: string): Product[] {
  return mockProducts.filter((p) => p.tags.includes(tag));
}

export const mockFeaturedHandles = [
  "t-12-tee",
  "relentless-hoodie",
  "finish-line-cap",
  "comeback-tee",
];

export const mockCollections: Collection[] = [
  {
    id: "gid://shopify/Collection/1",
    handle: "featured",
    title: "Featured",
    description: "The current best sellers.",
    products: mockProducts.filter((p) => mockFeaturedHandles.includes(p.handle)),
  },
  {
    id: "gid://shopify/Collection/2",
    handle: "t-shirts",
    title: "T-Shirts",
    description: "",
    products: getMockProductsByTag("t-shirt"),
  },
  {
    id: "gid://shopify/Collection/3",
    handle: "hoodies",
    title: "Hoodies",
    description: "",
    products: getMockProductsByTag("hoodie"),
  },
  {
    id: "gid://shopify/Collection/4",
    handle: "hats",
    title: "Hats",
    description: "",
    products: getMockProductsByTag("hat"),
  },
];
