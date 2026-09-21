import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify/products";
import Gallery from "@/components/product/Gallery";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import RelatedProducts from "@/components/product/RelatedProducts";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    openGraph: product.featuredImage
      ? {
          images: [
            {
              url: product.featuredImage.url,
              width: product.featuredImage.width,
              height: product.featuredImage.height,
              alt: product.featuredImage.altText ?? product.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="container-kyvorn py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-widest text-bone-faint">
          <Link href="/shop" className="hover:text-rust">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone-dim">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} title={product.title} />

          <div>
            <h1 className="font-headline text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              {product.title}
            </h1>

            <div className="mt-6">
              <ProductPurchasePanel product={product} />
            </div>

            <div className="mt-10 border-t border-steel/60 pt-8">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-bone-dim">
                Details
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-bone-dim">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts product={product} />
    </div>
  );
}
