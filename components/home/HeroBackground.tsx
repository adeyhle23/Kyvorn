"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A slow-motion crossfade between two real Kyvorn photos (mountains, then
 * old iron weights), each with a gentle Ken Burns zoom — a "living"
 * background in place of an actual video file. Freezes on the first frame
 * for prefers-reduced-motion.
 */
export default function HeroBackground() {
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          motionOk ? "animate-crossfade-a" : "opacity-100"
        )}
      >
        <div className={cn("absolute inset-0", motionOk && "animate-ken-burns")}>
          <Image
            src="/photos/mountain-peaks.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0",
          motionOk ? "animate-crossfade-b" : "opacity-0"
        )}
      >
        <div
          className={cn("absolute inset-0", motionOk && "animate-ken-burns")}
          style={{ animationDelay: "3s" }}
        >
          <Image
            src="/photos/training-weights.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
