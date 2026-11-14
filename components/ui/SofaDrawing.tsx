import type { ArmStyle, Seats } from "@/lib/products";
import { shade } from "@/lib/utils";

export type SofaMode = "sofa" | "bed";

interface SofaDrawingProps {
  color: string;
  mode: SofaMode;
  seats?: Seats;
  arms?: ArmStyle;
  storage?: boolean;
  /** Pillows + blanket in bed mode, throw cushions in sofa mode. */
  dressed?: boolean;
  className?: string;
}

type Pt = [number, number];
const poly = (p: Pt[]) => `M${p.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
const seg = (a: Pt, b: Pt) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;

const CX = 240;
const HALF: Record<Seats, number> = { 1: 74, 2: 116, 3: 150 };
const INK = "#2a241c";
const WOOD = "#6e4a2c";
const LINEN = "#f3ece0";

/**
 * Catalogue-style line drawing of a sofa cum bed. Pure SVG, no state — render it
 * twice (sofa + bed) and cross-fade with CSS when you need a transition.
 */
export default function SofaDrawing({
  color,
  mode,
  seats = 3,
  arms = "fixed",
  storage = false,
  dressed = true,
  className,
}: SofaDrawingProps) {
  const bed = mode === "bed";
  const s = HALF[seats];
  const L = CX - s;
  const R = CX + s;
  const hasArms = arms !== "none";
  const overhang = hasArms ? 58 : 22;
  const PL = L - overhang;
  const PR = R + overhang;
  const splits = Array.from({ length: seats - 1 }, (_, i) => (i + 1) / seats);
  const line = { stroke: INK, strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const fine = { stroke: INK, strokeOpacity: 0.45, strokeWidth: 1, strokeLinecap: "round" as const };

  const back = bed
    ? poly([[L + 16, 108], [R - 16, 108], [R, 166], [L, 166]])
    : poly([[L + 6, 74], [R - 6, 74], [R, 166], [L, 166]]);
  const backSeam = (t: number) =>
    bed ? seg([L + 16 + t * (R - L - 32), 112], [L + t * (R - L), 163]) : seg([L + 6 + t * (R - L - 12), 82], [L + t * (R - L), 160]);

  const armTop = bed && arms === "fold-down" ? 170 : 120;
  const armSides: [number, number][] = [
    [PL, L - 8],
    [R + 8, PR],
  ];
  const pillows = seats === 1 ? [{ cx: CX, w: 74 }] : [-1, 1].map((d) => ({ cx: CX + d * s * 0.44, w: Math.min(s * 0.62, 88) }));
  const throws = seats === 1 ? [CX] : [L + 34, R - 34];

  return (
    <svg viewBox="0 0 480 260" className={className} role="img" aria-label={`Sofa cum bed shown as a ${mode}`}>
      {/* Floor line + shadow */}
      <ellipse cx={CX} cy={248} rx={(PR - PL) / 2 + 8} ry={6} fill={INK} opacity={0.12} />
      <path d={seg([PL - 30, 248], [PR + 30, 248])} {...fine} strokeDasharray="2 5" />

      {/* Legs */}
      <path d={poly([[PL + 8, 229], [PL + 20, 229], [PL + 16, 246], [PL + 12, 246]])} fill={WOOD} {...line} />
      <path d={poly([[PR - 20, 229], [PR - 8, 229], [PR - 12, 246], [PR - 16, 246]])} fill={WOOD} {...line} />

      {/* Plinth */}
      <path d={poly([[PL, 214], [PR, 214], [PR, 230], [PL, 230]])} fill={WOOD} {...line} />
      {storage && <path d={seg([CX - 18, 222], [CX + 18, 222])} stroke={LINEN} strokeWidth={2.5} strokeLinecap="round" />}

      {/* Backrest */}
      <path d={back} fill={shade(color, 8)} {...line} />
      {splits.map((t) => (
        <path key={`b${t}`} d={backSeam(t)} {...fine} />
      ))}

      {/* Pillows (bed) */}
      {bed &&
        dressed &&
        pillows.map((p) => <rect key={`p${p.cx}`} x={p.cx - p.w / 2} y={112} width={p.w} height={22} rx={10} fill={LINEN} {...line} />)}

      {/* Seat */}
      <path d={poly([[L, 166], [R, 166], [R + 14, 190], [L - 14, 190]])} fill={shade(color, 16)} {...line} />
      {splits.map((t) => (
        <path key={`s${t}`} d={seg([L + t * (R - L), 168], [L - 14 + t * (R - L + 28), 189])} {...fine} />
      ))}
      <path d={poly([[L - 14, 190], [R + 14, 190], [R + 14, 213], [L - 14, 213]])} fill={shade(color, -14)} {...line} />
      {splits.map((t) => (
        <path key={`f${t}`} d={seg([L - 14 + t * (R - L + 28), 193], [L - 14 + t * (R - L + 28), 210])} {...fine} />
      ))}

      {/* Blanket (bed) */}
      {bed && dressed && (
        <g>
          <path d={poly([[L + 8, 146], [R - 8, 146], [R + 14, 188], [R + 14, 198], [L - 14, 198], [L - 14, 188]])} fill={LINEN} {...line} />
          <path d={seg([L + 4, 154], [R - 4, 154])} stroke={shade(color, -10)} strokeWidth={4} strokeLinecap="round" />
          <path d={seg([L + 1, 161], [R - 1, 161])} stroke={shade(color, -10)} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      )}

      {/* Arms */}
      {hasArms &&
        armSides.map(([x1, x2]) => (
          <g key={`a${x1}`}>
            <path d={poly([[x1, armTop], [x2, armTop], [x2, 230], [x1, 230]])} fill={shade(color, -4)} {...line} />
            <path d={seg([x1 + 4, armTop + 12], [x2 - 4, armTop + 12])} {...fine} />
          </g>
        ))}

      {/* Throw cushions (sofa) */}
      {!bed &&
        dressed &&
        throws.map((x, i) => (
          <g key={`t${x}`} transform={`rotate(${i === 0 && seats > 1 ? -9 : 9} ${x} 146)`}>
            <rect x={x - 22} y={124} width={44} height={42} rx={9} fill={LINEN} {...line} />
            <path d={seg([x - 12, 135], [x + 12, 155])} {...fine} />
            <path d={seg([x + 12, 135], [x - 12, 155])} {...fine} />
          </g>
        ))}
    </svg>
  );
}
