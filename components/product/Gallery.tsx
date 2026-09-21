"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ShopifyImage } from "@/lib/shopify/types";

export default function Gallery({
  images,
  title,
}: {
  images: ShopifyImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((image, i) => (
            <button
              key={image.url + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={activeIndex === i}
              className={cn(
                "relative h-16 w-14 shrink-0 overflow-hidden border bg-charcoal sm:h-20 sm:w-16",
                activeIndex === i ? "border-rust" : "border-steel"
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-charcoal">
        {active && (
          <Image
            src={active.url}
            alt={active.altText ?? title}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
