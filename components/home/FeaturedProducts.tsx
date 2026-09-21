import { getCollectionByHandle, getProducts } from "@/lib/shopify/products";
import { FEATURED_COLLECTION_HANDLE } from "@/lib/shopify/config";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import { LinkButton } from "@/components/ui/Button";

export default async function FeaturedProducts() {
  const collection = await getCollectionByHandle(FEATURED_COLLECTION_HANDLE);
  const products = collection?.products.length
    ? collection.products
    : await getProducts({ first: 4 });

  return (
    <section className="py-20 sm:py-28">
      <div className="container-kyvorn">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading kicker="Best Sellers" title="Wear The Work" />
          <LinkButton href="/shop" variant="outline">
            View All
          </LinkButton>
        </div>

        <div className="mt-12">
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </div>
    </section>
  );
}
