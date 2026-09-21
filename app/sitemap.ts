import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyvorn.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts({ first: 250 });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/story`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/shop/${product.handle}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
