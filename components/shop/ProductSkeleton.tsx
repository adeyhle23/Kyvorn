function ShimmerBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-charcoal-light ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-steel/40 to-transparent" />
    </div>
  );
}

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <ShimmerBlock className="aspect-[4/5] border border-steel/60" />
          <ShimmerBlock className="mt-3 h-4 w-3/4" />
          <ShimmerBlock className="mt-2 h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
