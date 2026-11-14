import { cn } from "@/lib/utils";

/**
 * Bombay Furniture emblem — a Marine Drive arch with an Art Deco sunburst over a
 * "BF" monogram. Strokes use currentColor; the monogram colour is set separately.
 */
const CX = 50;
const CY = 52;
const rays = Array.from({ length: 11 }, (_, i) => {
  const a = ((198 + i * 14.4) * Math.PI) / 180;
  const r1 = 11;
  const r2 = i % 2 === 0 ? 31 : 26;
  const f = (n: number) => Math.round(n * 100) / 100;
  return { x1: f(CX + r1 * Math.cos(a)), y1: f(CY + r1 * Math.sin(a)), x2: f(CX + r2 * Math.cos(a)), y2: f(CY + r2 * Math.sin(a)) };
});

export default function Emblem({ className, monogramClassName = "fill-primary" }: { className?: string; monogramClassName?: string }) {
  return (
    <svg viewBox="0 0 100 122" className={cn("shrink-0", className)} aria-hidden fill="none">
      {/* Arches */}
      <path d="M7 118V52a43 43 0 0 1 86 0v66Z" stroke="currentColor" strokeWidth="2" />
      <path d="M13 112V52a37 37 0 0 1 74 0v60Z" stroke="currentColor" strokeWidth="0.9" />
      {/* Sunburst */}
      {rays.map((r) => (
        <line key={`${r.x1}-${r.y1}`} {...r} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      ))}
      <path d="M41 52a9 9 0 0 1 18 0Z" fill="currentColor" />
      <path d="M20 56.5h60" stroke="currentColor" strokeWidth="0.9" />
      <path d="M50 53.5l3 3-3 3-3-3Z" fill="currentColor" />
      {/* Monogram */}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        className={monogramClassName}
        style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 27, letterSpacing: 1 }}
      >
        BF
      </text>
      {/* Plinth */}
      <path d="M24 101h52M30 105.5h40" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="19" cy="101" r="1.3" fill="currentColor" />
      <circle cx="81" cy="101" r="1.3" fill="currentColor" />
    </svg>
  );
}
