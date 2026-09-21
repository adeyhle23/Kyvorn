import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import StoryTeaser from "@/components/home/StoryTeaser";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProof from "@/components/home/SocialProof";
import ProductGridSkeleton from "@/components/shop/ProductSkeleton";
import AngledDivider from "@/components/ui/AngledDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AngledDivider tone="rust" />
      <StoryTeaser />
      <Suspense
        fallback={
          <div className="container-kyvorn py-20 sm:py-28">
            <ProductGridSkeleton count={4} />
          </div>
        }
      >
        <FeaturedProducts />
      </Suspense>
      <AngledDivider tone="steel" flip />
      <SocialProof />
    </>
  );
}
