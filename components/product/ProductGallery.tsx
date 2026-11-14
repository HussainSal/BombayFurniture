"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Swipeable on touch (native CSS scroll-snap — no gesture library), thumbnails on all sizes.
 */
export default function ProductGallery({ images, name, badge }: { images: StaticImageData[]; name: string; badge?: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    setActive(i);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== active) setActive(i);
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto bg-surface"
          aria-roledescription="carousel"
          aria-label={`${name} photos`}
        >
          {images.map((img, i) => (
            <div key={img.src} className="relative aspect-[4/3] w-full shrink-0 snap-center" aria-label={`Photo ${i + 1} of ${images.length}`}>
              <Image
                src={img}
                alt={i === 0 ? `${name} sofa cum bed` : `${name} — styled in a room`}
                fill
                priority={i === 0}
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-3 border border-ivory/60" aria-hidden />
        {badge && (
          <span className="pointer-events-none absolute left-6 top-6 bg-background px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]">
            {badge}
          </span>
        )}
        {/* Position dots (phones) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center gap-2 lg:hidden" aria-hidden>
          {images.map((img, i) => (
            <span key={img.src} className={cn("h-1.5 w-1.5 rotate-45 transition-colors", i === active ? "bg-ivory" : "bg-ivory/45")} />
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className={cn("relative aspect-[4/3] overflow-hidden ring-offset-2 ring-offset-background", i === active ? "ring-1 ring-foreground" : "opacity-70 hover:opacity-100")}
          >
            <Image src={img} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
