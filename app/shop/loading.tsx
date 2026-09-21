import ProductGridSkeleton from "@/components/shop/ProductSkeleton";

export default function ShopLoading() {
  return (
    <div className="container-kyvorn py-12 sm:py-16">
      <div className="mb-10 h-16 w-48 animate-pulse bg-charcoal-light" />
      <div className="mb-10 h-10 w-full animate-pulse border-b border-steel/60" />
      <ProductGridSkeleton />
    </div>
  );
}
