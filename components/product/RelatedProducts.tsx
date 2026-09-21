import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import { getRelatedProducts } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";

export default async function RelatedProducts({ product }: { product: Product }) {
  const related = await getRelatedProducts(product);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-steel/60 py-16 sm:py-20">
      <div className="container-kyvorn">
        <SectionHeading kicker="Keep Going" title="You Might Also Like" />
        <div className="mt-10">
          <ProductGrid products={related} />
        </div>
      </div>
    </section>
  );
}
