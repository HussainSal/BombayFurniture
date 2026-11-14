import { cn } from "@/lib/utils";

/** Circular maker's seal with text set on a path. Static SVG. */
export default function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={cn("text-brass-light", className)} aria-hidden>
      <defs>
        <path id="seal-ring" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
      </defs>
      <circle cx="60" cy="60" r="59" className="fill-forest" />
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text className="fill-ivory" style={{ fontFamily: "var(--font-sans)", fontSize: 8.6, letterSpacing: 2.6, fontWeight: 500 }}>
        <textPath href="#seal-ring" textLength="280">
          HANDCRAFTED • MADE TO ORDER • SOFA CUM BEDS •
        </textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" className="fill-ivory" style={{ fontFamily: "var(--font-serif)", fontSize: 24 }}>
        BF
      </text>
      <path d="M60 42l3 3-3 3-3-3Z M60 74l3 3-3 3-3-3Z" fill="currentColor" />
    </svg>
  );
}
